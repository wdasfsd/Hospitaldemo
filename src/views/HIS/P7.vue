<template>
  <div>
    <el-button type="primary" @click="openForm()">点击新增职位</el-button>
    <el-dialog
      title="新增职位"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="职位">
            <el-input v-model="form.position" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              v-model="form.dest"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
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
        width="100px"
      />
      <el-table-column
        fixed
        prop="position"
        label="职位"
        width="300px"
      />
      <el-table-column
        fixed
        prop="dest"
        label="描述"
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
import { GetAll, UpData, Del, Add } from '@/api/P7http'
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
    }
  },
  created() {
    this.reset()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async reset() { /* 重新发送请求 */
      const { data } = await GetAll()
      this.tableData = data
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
      tableData: [{
        id: '1',
        position: '',
        dest: ''
      }],
      form: {
        id: '',
        position: '',
        dest: ''
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
