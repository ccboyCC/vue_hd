<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
    <a-card class="general-card" :title="$t('menu.list.searchTable')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name" :label="$t('searchTable.form.dstip')">
                  <a-input
                    v-model="formModel.dstip"
                    :placeholder="$t('searchTable.form.dstip.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('searchTable.form.srcip')">
                  <a-input
                    v-model="formModel.srcip"
                    :placeholder="$t('searchTable.form.srcip.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="name"
                  :label="$t('searchTable.form.phonenum')"
                >
                  <a-space>
                    <a-checkbox v-model="isCheckePhone"></a-checkbox>
                    <a-input
                      v-model="phone"
                      :placeholder="
                        $t('searchTable.form.phonenum.placeholder')
                      "
                  /></a-space>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('searchTable.form.filterType')"
                >
                  <a-select
                    v-model="valueFind"
                    :style="{ width: '320px' }"
                    placeholder="Please select ..."
                    allow-clear
                  >
                    <a-option>tac</a-option>
                    <a-option>cid</a-option>
                    <a-option>rnti</a-option>
                    <a-option>tmsi</a-option>
                  </a-select>
                  <a-input
                    :placeholder="$t('searchTable.form.search.all')"
                    v-model="searchQueryAll"
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('searchTable.form.createdTime')"
                >
                  <a-range-picker
                    @select="onSelect"
                    v-model="selectedDates"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t("searchTable.form.search") }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t("searchTable.form.reset") }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <!-- <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button> -->
            <!-- <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
                </a-button>
              </template>
            </a-upload> -->
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t("searchTable.operation.download") }}
          </a-button>
          <a-tooltip :content="$t('searchTable.actions.refresh')">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('searchTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('searchTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="handleChange($event, item as TableColumnData, index)"
                      ></a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === "#" ? "序列号" : item.title }}
                    </div>
                  </div>
                </div>
                <div></div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :showPagination="true"
        :columns="cloneColumns as TableColumnData[]"
        :data="renderIpData"
        :column-resizable
        :bordered="true"
        :size="size"
        @page-change="onPageChange"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { IpDataSet, PolicyIpForm, queryIpList } from "@/api/list";
import useLoading from "@/hooks/loading";
import { Pagination } from "@/types/global";
import type { SelectOptionData } from "@arco-design/web-vue/es/select/interface";
import type { TableColumnData } from "@arco-design/web-vue/es/table/interface";
import cloneDeep from "lodash/cloneDeep";
import Sortable from "sortablejs";
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";

type SizeProps = "mini" | "small" | "medium" | "large";
type Column = TableColumnData & { checked?: true };

const isCheckePhone = ref(false);

const phone = ref(null);
const searchQueryAll = ref();

const valueFind = ref("");

const intervalId = ref(null);

const startPolling = (interval = 1500) => {
  intervalId.value = setInterval(() => {
    search();
  }, interval);
};

const stopPolling = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(startPolling);
onUnmounted(stopPolling);

const generateFormModel = () => {
  return {
    pageNo: 1,
    pageSize: 50,
    tac: undefined,
    cid: undefined,
    tmsi: undefined,
    rnti: undefined,
    srcip: undefined,
    dstip: undefined,
    starttime: undefined,
    endtime: undefined,
    isphonenum: 0,
    phonenum: undefined,
  };
};
const { loading, setLoading } = useLoading(true);
const { t } = useI18n();
const renderIpData = ref<IpDataSet[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);
const size = ref<SizeProps>("medium");

const basePagination: Pagination = {
  pageNo: 1,
  pageSize: 50,
  total: 100,
  tac: undefined,
  cid: undefined,
  tmsi: undefined,
  rnti: undefined,
  srcip: undefined,
  dstip: undefined,
  starttime: undefined,
  endtime: undefined,
  isphonenum: 0,
  phonenum: undefined,
};
const pagination = reactive({
  ...basePagination,
});
const densityList = computed(() => [
  {
    name: t("searchTable.size.mini"),
    value: "mini",
  },
  {
    name: t("searchTable.size.small"),
    value: "small",
  },
  {
    name: t("searchTable.size.medium"),
    value: "medium",
  },
  {
    name: t("searchTable.size.large"),
    value: "large",
  },
]);
const columns = computed<TableColumnData[]>(() => [
  {
    title: t("searchTable.columns.phone"),
    dataIndex: "phonenum",
  },
  {
    title: t("searchTable.columns.freq"),
    dataIndex: "freq",
  },
  {
    title: t("searchTable.columns.pci"),
    dataIndex: "pci",
  },
  {
    title: t("searchTable.columns.tac"),
    dataIndex: "tac",
  },
  {
    title: t("searchTable.columns.cid"),
    dataIndex: "cid",
  },
  {
    title: t("searchTable.columns.tmsi"),
    dataIndex: "tmsi",
  },
  {
    title: t("searchTable.columns.rnti"),
    dataIndex: "rnti",
  },
  {
    title: t("searchTable.columns.dstip"),
    dataIndex: "dstip",
  },
  {
    title: t("searchTable.columns.srcip"),
    dataIndex: "srcip",
  },
  {
    title: t("searchTable.columns.createdTime"),
    dataIndex: "timestamp",
  },
]);

const fetchDataIp = async (
  params: PolicyIpForm = {
    pageNo: 1,
    pageSize: 50,
    tac: undefined,
    cid: undefined,
    tmsi: undefined,
    rnti: undefined,
    srcip: undefined,
    dstip: undefined,
    starttime: undefined,
    endtime: undefined,
    phonenum: undefined,
    isphonenum: undefined,
  }
) => {
  setLoading(false);
  try {
    const { data } = await queryIpList(params);
    console.log("请求数据", data);
    data.ipDataSet.forEach((item: { timestamp: string }) => {
      // 对每个 item 执行操作，例如格式化时间
      console.log("datatime", item.timestamp);
      item.timestamp = formatDate(item.timestamp);
    });
    renderIpData.value = data.ipDataSet;
    pagination.current = params.pageNo;
    pagination.total = data.allsize;
  } catch (err) {
    // you can report use errorHandler or other
    console.log(err);
  } finally {
    setLoading(false);
  }
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const selectedDates = ref([]); // 绑定到 a-range-picker 的值
const resetRangePicker = () => {
  selectedDates.value = []; // 重置日期选择
  onSelect("");
};

const onSelect = (date: string | any[]) => {
  console.log("onSelect", date);
  if (Array.isArray(date) && date.length === 2) {
    const startDate = new Date(date[0]);
    const endDate = new Date(date[1]);

    // 获取时间戳
    const startTimestamp = startDate.getTime() / 1000;
    const endTimestamp = endDate.getTime() / 1000;

    // 将时间戳赋值给 formModel
    formModel.value.starttime = startTimestamp;
    formModel.value.endtime = endTimestamp;
  } else {
    formModel.value.starttime = undefined;
    formModel.value.endtime = undefined;
    console.log("date is not a valid array of two elements");
  }
};

const search = () => {
  console.log("选择框状态", isCheckePhone.value);
  console.log("搜索数据one", searchQueryAll.value);
  console.log("搜索数据two", formModel.value);
  console.log("搜索数据three", valueFind.value);
  switch (valueFind.value) {
    case "tac":
      formModel.value.tac = searchQueryAll.value;
      break;
    case "cid":
      formModel.value.cid = searchQueryAll.value;
      break;
    case "rnti":
      formModel.value.rnti = searchQueryAll.value;
      break;
    case "tmsi":
      formModel.value.tmsi = searchQueryAll.value;
      break;
    default:
      console.log("Unknown value type");
  }
  if (isCheckePhone.value) {
    formModel.value.isphonenum = 1;
    if (phone.value != null) {
      formModel.value.phonenum = `+86${phone.value}`;
    }
  } else {
    formModel.value.isphonenum = 0;
  }
  fetchDataIp({
    ...basePagination,
    ...formModel.value,
  } as unknown as PolicyIpForm);
};
const onPageChange = (pageNo: number) => {
  if (pageNo === 1) {
    startPolling();
  } else {
    stopPolling();
  }
  fetchDataIp({
    ...basePagination,
    ...formModel.value,
    pageNo,
  } as unknown as PolicyIpForm);
};

fetchDataIp();

const reset = () => {
  startPolling();
  isCheckePhone.value = false;
  phone.value = null;
  resetRangePicker();
  valueFind.value = "";
  searchQueryAll.value = "";
  formModel.value = generateFormModel();
};

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined,
  e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
  checked: boolean | (string | boolean | number)[],
  column: Column,
  index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
      (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
  array: T,
  beforeIdx: number,
  newIdx: number,
  isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
      beforeIdx,
      1,
      newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById("tableSetting") as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const { oldIndex, newIndex } = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        },
      });
    });
  }
};

watch(
  () => columns.value,
  (val) => {
    cloneColumns.value = cloneDeep(val);
    cloneColumns.value.forEach((item, index) => {
      item.checked = true;
    });
    showColumns.value = cloneDeep(cloneColumns.value);
  },
  { deep: true, immediate: true }
);
</script>

<script lang="ts">
export default {
  name: "SearchTable",
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
.action-icon {
  margin-left: 12px;
  cursor: pointer;
}
.active {
  color: #0960bd;
  background-color: #e3f4fc;
}
.setting {
  display: flex;
  align-items: center;
  width: 200px;
  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
