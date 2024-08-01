<template>
  <a-card
    class="general-card"
    :title="$t('workplace.announcement')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
    <template #extra>
      <a-link>{{ $t("workplace.viewMore") }}</a-link>
    </template>
    <div>
      <div v-for="(item, idx) in list" :key="idx" class="item">
        <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
        <span class="item-content">
          {{ item.content }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
const list = [
  {
    type: "red",
    label: "警告",
    content: "IP异常，手机号码：10011",
  },
  {
    type: "blue",
    label: "通知",
    content: "有短信，手机号码：10086",
  },
  {
    type: "cyan",
    label: "消息",
    content: "有语音，手机号码：10010",
  },
];
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 4px;
  .item-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
    color: var(--color-text-2);
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
