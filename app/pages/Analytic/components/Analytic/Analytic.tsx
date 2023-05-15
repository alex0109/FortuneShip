import {
  Canvas,
  Line,
  Path,
  runTiming,
  Skia,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';

import { curveBasis, line, scaleLinear, scaleTime } from 'd3';
import { getHistory, getWeekHistory } from 'pages/Analytic/lib/helpers/helpers';
import React from 'react';
import { Easing, View, Pressable, Text, StyleSheet } from 'react-native';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import { animatedData } from '../../lib/store/Data';

import type { IDataPoint } from '../../lib/types/types';
import type { SkPath } from '@shopify/react-native-skia';

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

const Analytic = () => {
  const { categories } = useTypedSelector((state) => state);

  const monthData: IDataPoint[] = getHistory(categories);
  const weekData: IDataPoint[] = getWeekHistory(monthData);

  const transition = useValue(1);
  const state = useValue({
    current: 0,
    next: 1,
  });

  const GRAPH_HEIGHT = 400;
  const GRAPH_WIDTH = 360;

  const makeGraph = (data: IDataPoint[]): GraphData => {
    const max = Math.max(...data.map((val) => val.count));
    const min = Math.min(...data.map((val) => val.count));
    const y = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);

    const x = scaleTime()
      .domain([new Date(2023, 4, 1), new Date(2023, 4, 15)])
      .range([10, GRAPH_WIDTH - 10]);

    const curvedLine = line<IDataPoint>()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.count))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine);

    return {
      max,
      min,
      curve: skPath!,
    };
  };

  const transitionStart = (end: number) => {
    state.current = {
      current: end,
      next: state.current.current,
    };
    transition.current = 0;
    runTiming(transition, 1, {
      duration: 750,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  const graphData = [makeGraph(animatedData), makeGraph(monthData)];

  const path = useComputedValue(() => {
    const start = graphData[state.current.current].curve;
    const end = graphData[state.current.next].curve;
    const result = start.interpolate(end, transition.current);
    return result?.toSVGString() ?? '0';
  }, [state, transition]);

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          width: GRAPH_WIDTH,
          height: GRAPH_HEIGHT,
        }}>
        <Line
          p1={vec(10, 130)}
          p2={vec(400, 130)}
          color='lightgrey'
          style='stroke'
          strokeWidth={1}
        />
        <Line
          p1={vec(10, 250)}
          p2={vec(400, 250)}
          color='lightgrey'
          style='stroke'
          strokeWidth={1}
        />
        <Line
          p1={vec(10, 370)}
          p2={vec(400, 370)}
          color='lightgrey'
          style='stroke'
          strokeWidth={1}
        />
        <Path style='stroke' path={path} strokeWidth={4} color='#6231ff' />
      </Canvas>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => transitionStart(0)} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Week</Text>
        </Pressable>
        <Pressable onPress={() => transitionStart(1)} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Month</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: '#6231ff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
});

export default Analytic;
