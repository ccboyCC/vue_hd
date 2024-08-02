<template>
  <a-card
    class="general-card chat-panel"
    :title="$t('monitor.title.chatPanel')"
    :bordered="false"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{
      height: '100%',
      paddingTop: '16px',
      display: 'flex',
      flexFlow: 'column',
    }"
  >
    <a-space :size="8">
      <a-select style="width: 86px" default-value="all">
        <a-option value="all">
          {{ $t("monitor.chat.options.all") }}
        </a-option>
      </a-select>
    </a-space>
    <div class="chat-panel-content">
      <a-spin style="width: 100%">
        <ChatList :render-list="ipData" />
      </a-spin>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { IpDataSet, PolicyIpForm, queryIpList } from "@/api/list";
import ChatList from "./chat-list.vue";

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
const ipData = ref<IpDataSet[]>([]);
const fetchData = async (
  params: PolicyIpForm = {
    pageNo: 1,
    pageSize: 5,
    tac: undefined,
    cid: undefined,
    tmsi: undefined,
    rnti: undefined,
    srcip: undefined,
    dstip: undefined,
    starttime: undefined,
    endtime: undefined,
  }
) => {
  try {
    const { data } = await queryIpList(params);
    console.log("card_more", data);
    data.ipDataSet.forEach((item: { timestamp: string }) => {
      // 对每个 item 执行操作，例如格式化时间
      item.timestamp = formatDate(item.timestamp);
    });
    ipData.value = data.ipDataSet;
  } catch (err) {
    // you can report use errorHandler or other
  }
};
const intervalId = ref();
const startPolling = (interval = 3000) => {
  intervalId.value = setInterval(() => {
    fetchData();
  }, interval);
};

const stopPolling = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

// fetchData();

onMounted(startPolling);
onUnmounted(stopPolling);
</script>

<style scoped lang="less">
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  // padding: 20px;
  background-color: var(--color-bg-2);

  &-content {
    flex: 1;
    margin: 20px 0;
  }
}
</style>
