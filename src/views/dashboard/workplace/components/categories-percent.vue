<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <template #title>
        {{ $t("workplace.categoriesPercent") }}
      </template>
      <Chart height="310px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import useLoading from "@/hooks/loading";
import useChartOption from "@/hooks/chart-option";

const { loading } = useLoading();
const { chartOption } = useChartOption((isDark) => {
  // echarts support https://echarts.apache.org/zh/theme-builder.html
  // It's not used here
  return {
    legend: {
      left: "center",
      data: ["语音", "短信", "手机号"],
      bottom: 0,
      icon: "circle",
      itemWidth: 8,
      textStyle: {
        color: isDark ? "rgba(255, 255, 255, 0.7)" : "#4E5969",
      },
      itemStyle: {
        borderWidth: 0,
      },
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    graphic: {
      elements: [
        {
          type: "text",
          left: "center",
          top: "40%",
          style: {
            text: "总计",
            textAlign: "center",
            fill: isDark ? "#ffffffb3" : "#4E5969",
            fontSize: 14,
          },
        },
        {
          type: "text",
          left: "center",
          top: "50%",
          style: {
            text: "",
            textAlign: "center",
            fill: isDark ? "#ffffffb3" : "#1D2129",
            fontSize: 16,
            fontWeight: 500,
          },
        },
      ],
    },
    series: [
      {
        type: "pie",
        radius: ["50%", "70%"],
        center: ["50%", "50%"],
        label: {
          formatter: "{d}%",
          fontSize: 14,
          color: isDark ? "rgba(255, 255, 255, 0.7)" : "#4E5969",
        },
        itemStyle: {
          borderColor: isDark ? "#232324" : "#fff",
          borderWidth: 1,
        },
        data: [
          {
            value: [0],
            name: "语音",
            itemStyle: {
              color: isDark ? "#3D72F6" : "#249EFF",
            },
          },
          {
            value: [0],
            name: "手机号",
            itemStyle: {
              color: isDark ? "#A079DC" : "#313CA9",
            },
          },
          {
            value: [0],
            name: "短信",
            itemStyle: {
              color: isDark ? "#6CAAF5" : "#21CCFF",
            },
          },
        ],
      },
    ],
  };
});
</script>

<style scoped lang="less"></style>
