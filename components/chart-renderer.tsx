import cubejs, { PivotConfig } from "@cubejs-client/core";

import {
  QueryBuilderRenderProps,
  QueryRenderer,
  QueryRendererProps,
  QueryRendererRenderProps,
} from "@cubejs-client/react";

import { Spin } from "antd";
import "antd/dist/antd.css";
import React, { FC } from "react";
import { Bar } from "react-chartjs-2";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTkyMTM3NzIsImV4cCI6MTYxOTMwMDE3Mn0.wx-GqgQY56E0V49ECVt3CCOEyJ0_cpNkc_bjdDkNRwo";

const API_URL = "http://localhost:8080/cubejs-api/v1";

const COLORS_SERIES = ["#FF6492", "#141446", "#7A77FF"];

const cubejsApi = cubejs(API_TOKEN, {
  apiUrl: API_URL,
});

const render = (renderProps: QueryRendererRenderProps): JSX.Element => {
  console.debug({ renderProps });
  // VizState
  // QueryBuilderRenderProps
  // PivotConfigUpdater
  const pivotConfig: PivotConfig = {
    x: ["People.birthdate"],
    y: ["measures"],
    fillMissingDates: true,
  };

  const obj = {
    ...renderProps,
    chartType: "bar",
    pivotConfig,
  };

  if (!obj.resultSet) {
    return <Spin />;
  }

  const labels = obj.resultSet
    .categories()
    .map((c: Record<string, unknown>) => c.category);

  const datasets = obj.resultSet.series().map((s, index) => ({
    label: s.title,
    data: s.series.map((r: Record<string, unknown>) => r.value),
    borderColor: COLORS_SERIES[index],
    fill: false,
  }));

  const data = {
    labels,
    datasets,
  };

  const options = {
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} type={"bar"} />;
};

const ChartRenderer: FC = () => {
  const props: QueryRendererProps = {
    query: {
      measures: ["People.count"],
      timeDimensions: [],
      order: [["People.birthdate", "asc"]],
      dimensions: ["People.birthdate"],
    },
    cubejsApi,
    resetResultSetOnChange: false,
    render,
  };

  return <QueryRenderer {...props} />;
};

export { ChartRenderer };
