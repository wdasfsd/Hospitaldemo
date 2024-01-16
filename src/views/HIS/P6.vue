<template>
  <div>
    <el-button type="primary" @click="openForm()">点击新增科室 </el-button>
    <el-dialog
      title="新增科室"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="科室名称" class="custom-form-item">
            <el-input v-model="form.departmentname" />
          </el-form-item>
          <el-form-item label="主治医生" class="custom-form-item">
            <el-select v-model="form.doctor" placeholder="请选择主治医生">
              <el-option v-for="option in filteredpersonnels" :key="option.name" :label="option.name" :value="option.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="服务范围" style="white-space: nowrap;" class="custom-form-item">
            <el-input v-model="form.servicearea" size="small" style="width: 150px;" />
          </el-form-item>
          <el-form-item label="开放时间" class="custom-form-item">
            <el-select v-model="form.openingtime" placeholder="请选择开放时间">
              <el-option label="24H" value="24H" />
              <el-option label="8:00-17:00" value="8:00-17:00" />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" class="custom-form-item">
            <el-select v-model="form.principal" placeholder="请选择负责人">
              <el-option v-for="option in filteredpersonnels" :key="option.name" :label="option.name" :value="option.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" class="custom-form-item">
            <el-input v-model="form.tel" />
          </el-form-item>
          <el-form-item label="地址" class="custom-form-item">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      :data="filteredData"
      border
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="departmentname"
        label="科室名"
      />
      <el-table-column
        prop="doctor"
        label="主治医生"
      />
      <el-table-column
        prop="servicearea"
        label="服务范围"
      />
      <el-table-column
        prop="openingtime"
        label="开放时间"
      />
      <el-table-column
        prop="principal"
        label="负责人"
      />
      <el-table-column
        prop="tel"
        label="联系方式"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="openForm(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="DEL(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { GetAll, UpData, Del, Add, GetPersonnel } from '@/api/P6http'
const options = {
  computed: {
    // 根据分页信息计算当前页的数据
    filteredData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.tableData.slice(startIndex, endIndex)
    },
    totalItems() {
      return this.tableData.length
    },
    filteredpersonnels() {
      return this.personnels.filter(personnel => personnel.department === this.form.departmentname)
    }
  },
  created() {
    this.reset()
    this.Personnel()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async reset() { /* 重新发送请求 */
      const { data } = await GetAll()
      this.tableData = data
    },
    async Personnel() { /* 重新发送请求 */
      const { data: personnel } = await GetPersonnel()
      this.personnels = personnel
    },
    openForm(row) { /* 打开表单 */
      this.dialogVisible = true
      this.form = { ...row }
    },
    async handleSubmit() {
      if (this.form.id == null) {
        // eslint-disable-next-line no-unused-vars
        const a = await Add(this.form)
      } else {
        // eslint-disable-next-line no-unused-vars
        const b = await UpData(this.form)
      }
      this.reset()
      this.dialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    DEL(row) {
      // 使用 Element UI 的 MessageBox 进行确认
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 用户点击了确定按钮
        Del(row)
        setTimeout(() => {
          this.reset()// 等待一段时间后执行查询操作
        }, 1000)
      }).catch(() => {
        // 用户点击了取消按钮
      })
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      personnels: [],
      tableData: [{
        id: '1',
        departmentname: '内科',
        doctor: '王洋',
        servicearea: '内科',
        openingtime: '24H',
        principal: '王洋',
        tel: '15131085994',
        address: 'A-23'
      }],
      form: {
        departmentname: '',
        doctor: '',
        servicearea: '',
        openingtime: '',
        principal: '',
        tel: '',
        address: ''
      },
      dialogVisible: false
    }
  }
}
export default options
</script>
<style>
table {
  width: 100%;
}
.pagination {
  text-align: right;
}

</style>
