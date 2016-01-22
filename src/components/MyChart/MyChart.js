
import React, { Component } from 'react';
import d3 from 'd3';
import {
    ChartCanvas,
    Chart,
    DataSeries,
    EventCapture,
    series,
    coordinates,
    tooltip,
    transforms,
    axes,
    helper
} from 'react-stockcharts';
import MyToolTip from '../ChartTooltip/ChartTooltip';
import MyStockscaleTransformer from './MyDataTransformer';


const { LineSeries } = series;
const { MouseCoordinates, EdgeContainer, EdgeIndicator } = coordinates;
const { TooltipContainer, OHLCTooltip } = tooltip;
//const { StockscaleTransformer, DummyTransformer } = transforms;
const { XAxis, YAxis } = axes;
const { fitWidth, TypeChooser } = helper;

class CandleStickChartWithZoomPan extends Component {

  render() {
    const { data, type, width } = this.props;

    return (
      <ChartCanvas width={width} height={400}
                   margin={{left: 70, right: 70, top: 10, bottom: 30}} initialDisplay={200}
                   dataTransform={[ { transform: MyStockscaleTransformer } ]}
                   data={data} type={type} interval="D">
          <Chart id={1} yMousePointerDisplayLocation="right" yMousePointerDisplayFormat={(y) => y.toFixed(2)}>
              <XAxis axisAt="bottom" orient="bottom" stroke="#FFFFFF" tickStroke="#FFFFFF" />
              <YAxis axisAt="right" orient="right" ticks={5} stroke="#FFFFFF" tickStroke="#FFFFFF" />
              <DataSeries id={0} yAccessor={d => d.ask} >
                  <LineSeries stroke="#FF7A00" />
              </DataSeries>
              <DataSeries id={1} yAccessor={d => d.last} >
                  <LineSeries stroke="#FFFFFF"/>
              </DataSeries>
              <DataSeries id={2} yAccessor={d => d.bid} >
                  <LineSeries stroke="#006EFF" />
              </DataSeries>
          </Chart>
          <EdgeContainer>
            <EdgeIndicator itemType="last" orient="right" edgeAt="right" forChart={1} forDataSeries={0} fill="#FF7A00" />
            <EdgeIndicator itemType="last" orient="right" edgeAt="right" forChart={1} forDataSeries={1} fill="#000000" textFill="#000000" />
            <EdgeIndicator itemType="last" orient="right" edgeAt="right" forChart={1} forDataSeries={2} fill="#006EFF" />
          </EdgeContainer>
          <MouseCoordinates xDisplayFormat={d3.time.format('%H:%M:%S')} stroke="#FFFFFF" opacity={0.4} />
          <EventCapture mouseMove={true} zoom={false} pan={true} mainChart={1} defaultFocus={false} />
      </ChartCanvas>
    );
  }
}

CandleStickChartWithZoomPan.propTypes = {
  data: React.PropTypes.array.isRequired,
  width: React.PropTypes.number.isRequired,
  type: React.PropTypes.oneOf(['svg', 'hybrid']).isRequired,
};

CandleStickChartWithZoomPan.defaultProps = {
  type: 'svg',
};

export default fitWidth(CandleStickChartWithZoomPan);
