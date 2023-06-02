import { Canvas, Line, Path, Skia, vec } from '@shopify/react-native-skia';

import { curveBasis, line, scaleLinear, scaleTime } from 'd3';

import React, { useContext } from 'react';
import { View, Pressable, Text, Dimensions } from 'react-native';

import themeContext from 'shared/lib/context/themeContext';

import { styles } from './AnalyticGraph.styles';

import type { SkPath } from '@shopify/react-native-skia';
import type { FC } from 'react';
import type { IHistory } from 'shared/types/IHistory';

const { width, height } = Dimensions.get('window');

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

interface AnalyticGraphProps {
  history: IHistory[];
}

const AnalyticGraph: FC<AnalyticGraphProps> = ({ history }) => {
  const theme = useContext<{ backgroundColor?: string; color?: string }>(themeContext);

  const GRAPH_HEIGHT = height / 2.5;
  const GRAPH_WIDTH = width - 20;

  const makeGraph = (data: IHistory[]): GraphData => {
    const min = Math.min(...data.map((val) => val.value));
    const max = Math.max(...data.map((val) => val.value));

    const getYAxis = scaleLinear().domain([0, max]).range([GRAPH_HEIGHT, 35]);
    const getXAxis = scaleTime()
      .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
      .range([10, GRAPH_WIDTH - 10]);

    const curvedLine = line<IHistory>()
      .x((d) => getXAxis(new Date(d.date)))
      .y((d) => getYAxis(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      min,
      max,
      curve: skPath!,
    };
  };

  const graphData = makeGraph(history);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View>
        <Canvas style={{ height: GRAPH_HEIGHT, width: GRAPH_WIDTH }}>
          <Line
            strokeWidth={1}
            color='lightGrey'
            p1={vec(10, width * 0.2)}
            p2={vec(400, width * 0.2)}
          />
          <Line
            strokeWidth={1}
            color='lightGrey'
            p1={vec(10, width * 0.5)}
            p2={vec(400, width * 0.5)}
          />
          <Line
            strokeWidth={1}
            color='lightGrey'
            p1={vec(10, width * 0.8)}
            p2={vec(400, width * 0.8)}
          />
          <Path path={graphData.curve} color='purple' strokeWidth={3} style='stroke' />
        </Canvas>
      </View>
      <View>
        <Pressable style={styles.buttonStyle} onPress={() => {}}>
          <Text style={styles.textStyle}>Month</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AnalyticGraph;
