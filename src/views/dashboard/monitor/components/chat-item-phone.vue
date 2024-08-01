<template>
  <div
    :class="[
      'chat-item-phone',
      itemData.isCollect ? 'chat-item-phone-collected' : '',
    ]"
  >
    <a-space :size="4" direction="vertical" fill>
      <a-typography-text type="warning">
        {{ "手机：" }}{{ itemData.phonenum }}
      </a-typography-text>
      <a-typography-text type="warning">
        {{ "短信:" }}{{ "" }}
      </a-typography-text>
      <a-typography-text type="warning">
        {{ "语音:" }}{{ "" }}
      </a-typography-text>
      <div class="chat-item-phone-footer">
        <div class="chat-item-phone-time">
          <a-typography-text type="secondary">
            {{ "时间：" }} {{ itemData.timestamp }}
          </a-typography-text>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { IpDataSet } from "@/api/list";

defineProps({
  itemData: {
    type: Object as PropType<IpDataSet>,
    default() {
      return {};
    },
  },
});
</script>

<style scoped lang="less">
.chat-item-phone {
  padding: 8px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 2px;

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-actions {
    display: flex;
    opacity: 0;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin-right: 4px;
      color: var(--color-text-3);
      font-size: 14px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: rgb(var(--gray-3));
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &-collected {
    .chat-item-actions-collect {
      color: rgb(var(--gold-6));
    }
  }

  &:hover {
    background-color: rgb(var(--gray-2));

    .chat-item-actions {
      opacity: 1;
    }
  }
}
</style>
