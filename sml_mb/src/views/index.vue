<template>
  <div class="container">
    <div class="time-block" @click="showPicker('startTime')">
      <div>开始时间<i class="qw-icon-time"></i></div>
      <p class="time">
        {{ startTime | dayFilters }}<i class="qw-icon-arrow-right"></i>
      </p>
    </div>

    <div class="time-block" @click="showPicker('endTime')">
      <div>结束时间<i class="qw-icon-time"></i></div>
      <p class="time">
        {{ endTime | dayFilters }}<i class="qw-icon-arrow-right"></i>
      </p>
    </div>

    <div class="result">
      <!--<qw-button type="primary" @click="check">计算结果</qw-button>-->
      <p class="res-text">
        累计 <b>{{ res }}</b> 天<br />共计
        <b>
          <b class="total-day" @click="changeTotal"
            >{{ count / 100 }}元 <i class="qw-icon-help"
          /></b>
          <!--<qw-input
            class="total-day"
            v-model="count"
            border
            placeholder="请输入"
						type="Number"
            @change="change"
          ></qw-input>-->
        </b>
      </p>
    </div>
    <qw-date-picker
      v-model="datePickerVisible"
      :current="current"
      show-week
      title="Date Picker"
      subtitle="a date picker you can choose week"
      @select="select"
    >
    </qw-date-picker>
  </div>
</template>

<script>
import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
let initDate = "2017-12-25 00:00:00";

export default {
  name: "index",
  components: {},
  props: {},
  filters: {
    dayFilters(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      datePickerVisible: false,
      current: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      curType: "",
      res: 0,
      count: 0
    };
  },
  computed: {},
  created() {
    this.check();
  },
  methods: {
    // 选择日期确认
    select(val) {
      this[this.curType] = val;
      this.check();
    },
    //显示选择日期弹窗
    showPicker(val) {
      this.curType = val;
      this.datePickerVisible = true;
      this.current = this[val];
    },
    check() {
      this.res = this.diffDate(this.endTime, this.startTime);
      this.count = this.sum(this.startTime);
    },
    // 求和
    sum(start) {
      let n = this.res;
      return this.diffDate(start) * n + (n * (n - 1)) / 2;
    },
    // 相差天数
    diffDate(end, start = initDate) {
      return (
        dayjs(end)
          .endOf("day")
          .diff(start, "d") + 1
      );
    },
    changeTotal() {
      this.$prompt("", "输入金额可跳转至对应日期(一千元以内)", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入金额",
        inputType: "Number",
        beforeClose: (action, instance, done) => {
          if (
            action === "confirm" &&
            (instance.inputValue > 999 || instance.inputValue <= 0)
          ) {
            this.$toast({
              type: "error",
              content: `请输入0到1000元之间`
            });
          } else {
            done();
          }
        }
      })
        .then(({ value }) => {
          this.startTime = this.endTime = dayjs(initDate)
            .add(Number(value) * 100 - 1, "day")
            .toDate();
          this.check();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 20px;
  color: #9586bf;
  .time-block {
    padding: 4px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-bottom: 10px;
    border-bottom: 1px solid #f5f6f7;
  }
  .qw-icon-time {
    margin-left: 4px;
  }
  .time {
    font-size: 20px;
  }
  .result {
    text-align: center;
    .qw-button {
      width: 20%;
      margin: 0 auto;
      background: #9586bf;
    }
    .res-text {
      margin-top: 20px;
      text-align: center;
      b {
        font-weight: bold;
        font-size: 24px;
        color: palevioletred;
      }
      .total-day {
        /*width: 100px;*/
        /*display: inline-block;*/
        /*text-decoration: underline;*/
      }
    }
  }
}
</style>
