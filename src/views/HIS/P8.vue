<template>
  <div class="n1">
    <el-tabs v-model="activeName" style="width:100%" :stretch="stretchvalue">
      <el-tab-pane label="排队列表" name="first" class="custom-tab-pane" style="width: 100%">
        <el-table
          :data="filteredList"
          border
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="name"
            label="患者姓名"
          />
          <el-table-column
            fixed
            prop="department"
            label="就诊科室"
          />
          <el-table-column
            fixed
            prop="doctorName"
            label="就诊医生"
          />
          <el-table-column
            prop="idCardNumber"
            label="患者身份证"
          />
          <el-table-column
            prop="emergencyContactName"
            label="患者紧急联系人"
          />
          <el-table-column
            prop="symptomDescription"
            label="患者症状描述"
          />
          <el-table-column
            prop="state"
            label="患者就诊状态"
          />
          <el-table-column
            prop="me"
            label="我的预约"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="call(scope.row)">呼叫</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="患者电子病例" name="second" class="custom-tab-pane" style="width: 100%">
        <el-form ref="form" :model="form" style="width: 100%">
          <el-form-item label="主诉">
            <el-input v-model="form.chief_complaint" type="textarea" />
          </el-form-item>
          <el-form-item label="现病史">
            <el-input v-model="form.history_of_present_illness" type="textarea" />
          </el-form-item>
          <el-form-item label="治疗史">
            <el-input v-model="form.history_of_treatment" type="textarea" />
          </el-form-item>
          <el-form-item label="既往病史">
            <el-input v-model="form.past_history" type="textarea" />
          </el-form-item>
          <el-form-item label="过敏史">
            <el-input v-model="form.allergies" type="textarea" />
          </el-form-item>
          <el-form-item label="健康检查">
            <el-input v-model="form.health_checkup" type="textarea" />
          </el-form-item>
          <el-form-item label="初步诊断">
            <el-input v-model="form.priliminary_dise_str_list" type="textarea" />
            <el-button type="primary" @click="drawer = true">
              使用病历模版
            </el-button>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="onSubmit">下一步</el-button>
          </el-form-item>
        </el-form>
        <el-drawer
          title="病例模版"
          :visible.sync="drawer"
          :direction="direction"
        >
          <span>我来啦!</span>
        </el-drawer>
      </el-tab-pane>
      <el-tab-pane label="开发处方" name="third" class="custom-tab-pane">
        角色管理
      </el-tab-pane>
      <el-tab-pane label="诊闭" name="fourth" class="custom-tab-pane">
        定时任务补偿
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { GetByDepartment } from '@/api/P8http'
const options = {
  computed: {
    filteredList() {
      return this.List.filter(item => this.filterFunction(item))
    }
  },
  created() {
    this.GetByDepartment(this.$store.state.user.department)
  },
  data() {
    return {
      activeName: 'first',
      stretchvalue: true,
      List: [],
      form: {
        chief_complaint: '',
        history_of_present_illness: '',
        history_of_treatment: '',
        past_history: '',
        allergies: '',
        health_checkup: '',
        priliminary_dise_str_list: '',
        idCardNumber: ''
      },
      drawer: false,
      direction: 'btt'
    }
  },
  methods: {
    call(row) {
      this.form.idCardNumber = row.idCardNumber
      this.activeName = 'second'
      console.log(this.form.idCardNumber)
    },
    onSubmit() {
    },
    async GetByDepartment(data) { /* 根据科室向预约列表发送请求 */
      const { data: registration } = await GetByDepartment(data)
      this.List = registration
    },
    filterFunction(item) {
      if (item.doctorName === this.$store.state.user.username) {
        item.me = '✅'
      } else {
        item.me = '❎'
      }
      return true
    }
  }
}
export default options
</script>

<style scoped>
.custom-tab-pane {
  width: 100vh; /* 设置你想要的宽度 */
  height: 80vh; /* 80% 视口高度，可以根据实际情况调整 */
  overflow-y: auto; /* 添加这一行，允许垂直滚动 */
}
.n1 {
  display: flex;
  height: 100vh;
  background-color: #e2e2e2;
}
</style>
