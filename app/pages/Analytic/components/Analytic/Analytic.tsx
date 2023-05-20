import { Canvas, Line, Path, Skia, vec } from '@shopify/react-native-skia';

import { curveBasis, line, scaleLinear, scaleTime } from 'd3';
import { getHistory } from 'pages/Analytic/lib/helpers/helpers';
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

import { useTypedSelector } from 'shared/lib/hooks/useTypedSelector';

import type { IDataPoint } from '../../lib/types/types';
import type { SkPath } from '@shopify/react-native-skia';

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

const Analytic = () => {
  const { categories } = useTypedSelector((state) => state);

  const GRAPH_HEIGHT = 400;
  const GRAPH_WIDTH = 370;
  const data = getHistory(categories);

  const makeGraph = (data: IDataPoint[]): GraphData => {
    const min = Math.min(...data.map((val) => val.count));
    const max = Math.max(...data.map((val) => val.count));

    const getYAxis = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);
    const getXAxis = scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([10, GRAPH_WIDTH - 10]);

    const curvedLine = line<IDataPoint>()
      .x((d) => getXAxis(new Date(d.date)))
      .y((d) => getYAxis(d.count))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      min,
      max,
      curve: skPath!,
    };
  };

  const graphData = makeGraph(data);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Canvas style={{ height: GRAPH_HEIGHT, width: GRAPH_WIDTH }}>
          <Line strokeWidth={1} color='lightGrey' p1={vec(10, 130)} p2={vec(400, 130)} />
          <Line strokeWidth={1} color='lightGrey' p1={vec(10, 250)} p2={vec(400, 250)} />
          <Line strokeWidth={1} color='lightGrey' p1={vec(10, 370)} p2={vec(400, 370)} />
          <Path path={graphData.curve} color='purple' strokeWidth={4} style='stroke' />
        </Canvas>
      </View>
      <Pressable style={styles.buttonStyle} onPress={() => {}}>
        <Text style={styles.textStyle}>Month</Text>
      </Pressable>
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
