<template>
  <div class="home9">
    <div>
      <el-select v-model="department" placeholder="按照科室查询" class="keshi" size: medium @change="handleFilter">
        <el-option
          v-for="item in departments"
          :key="item.departmentname"
          :label="item.departmentname"
          :value="item.departmentname"
        />
      </el-select>
    </div>
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
    </el-table>
  </div>
</template>
<script>
import tab from '@/views/tab/index.vue'
import { GetPersonnel, GetDepartment, GetAll } from '@/api/P1http'
const options = {
  computed: {
    tab() {
      return tab
    }
  },
  created() {
    this.GetPersonnels()
    this.GetDepartment()
    this.reset()
    setTimeout(() => {
      this.handleFilter()
    }, 500)
  },
  methods: {
    showDetails(row) {
      console.log(row)
    },
    handleFilter() {
      if (this.department === '') {
        // 如果没有选择科室，则显示所有数据
        this.filteredList = this.Tabdata
      } else {
        // 否则，根据选择的科室进行筛选
        this.filteredList = this.Tabdata.filter(item => item.department === this.department)
      }
    },
    async reset() { /* 重新发送请求 */
      const { data: Tab } = await GetAll()
      this.Tabdata = Tab
    },
    async GetPersonnels() { /* 重新发送请求 */
      const { data: Personnel } = await GetPersonnel()
      this.personnels = Personnel
    },
    async GetDepartment() { /* 重新发送请求 */
      const { data: Department } = await GetDepartment()
      this.departments = Department
    },
    openForm(row) { /* 打开表单 */
      this.form = row
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  data() {
    return {
      from: {},
      filteredList: [],
      dialogVisible: false,
      Tabdata: [],
      personnels: [],
      departments: [],
      personnel: '',
      department: ''
    }
  }
}
export default options
</script>

<style>
.keshi{
  width: 300px;
  height: 50px;
}
</style>
