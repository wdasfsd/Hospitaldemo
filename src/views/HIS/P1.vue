<template>
  <div class="home">
    <el-button round class="registered" icon="el-icon-edit" @click="openForm()">挂号</el-button>
    <el-dialog
      title="请先输入身份证号，以此查看是否在本院有登记记录"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="身份证号" prop="idCardNumber">
            <el-input v-model="form.idCardNumber" />
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="sendId">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="text0"
      :visible.sync="dialogVisible1"
      width="40%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="110px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDate">
            <div class="block">
              <span class="demonstration" />
              <el-date-picker
                v-model="form.birthDate"
                type="date"
                placeholder="选择日期"
              />
            </div>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="maritalStatus">
            <el-select v-model="form.maritalStatus" placeholder="请选择">
              <el-option label="未婚" value="未婚" />
              <el-option label="已婚" value="已婚" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="contactPhone">
            <el-input v-model="form.contactPhone" />
          </el-form-item>
          <el-form-item label="家庭地址" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
          <el-form-item label="就诊目的" prop="purpose">
            <el-input v-model="form.purpose" />
          </el-form-item>
          <el-form-item label="就诊科室" prop="department">
            <el-select v-model="form.department" placeholder="请选择科室">
              <el-option v-for="option in departments" :key="option.departmentname" :label="option.departmentname" :value="option.departmentname" />
            </el-select>
          </el-form-item>
          <el-form-item label="医生姓名" prop="doctorName">
            <el-select v-model="form.doctorName" placeholder="请选择主治医生">
              <el-option v-for="option in filteredPersonnels" :key="option.name" :label="option.name" :value="option.name" />
            </el-select>
          </el-form-item>
          <el-form-item label="预约时间" prop="appointmentTime">
            <div class="block">
              <span class="demonstration" />
              <el-date-picker
                v-model="form.appointmentTime"
                type="date"
                placeholder="选择日期"
              />
            </div>
          </el-form-item>
          <el-form-item label="医疗保险卡号" prop="insuranceCardNumber">
            <el-input v-model="form.insuranceCardNumber" />
          </el-form-item>
          <el-form-item label="医疗保险类型" prop="insuranceType">
            <el-input v-model="form.insuranceType" />
          </el-form-item>
          <el-form-item label="过敏史描述" prop="allergyDescription">
            <el-input v-model="form.allergyDescription" />
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-input v-model="form.paymentMethod" />
          </el-form-item>
          <el-form-item label="结算方式" prop="settlementMethod">
            <el-input v-model="form.settlementMethod" />
          </el-form-item>
          <el-form-item label="紧急联系人姓名" prop="emergencyContactName">
            <el-input v-model="form.emergencyContactName" />
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="emergencyContactPhone">
            <el-input v-model="form.emergencyContactPhone" />
          </el-form-item>
          <el-form-item label="与患者关系" prop="relationship">
            <el-input v-model="form.relationship" />
          </el-form-item>
          <el-form-item label="症状描述" prop="symptomDescription">
            <el-input v-model="form.symptomDescription" />
          </el-form-item>
          <el-form-item label="状态" prop="symptomDescription">
            <el-radio-group v-model="form.state" size="medium">
              <el-radio border label="预约中" />
            </el-radio-group>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { SelectById, Add, GetPersonnel, GetDepartment } from '@/api/P1http'
const options = {
  computed: {
    filteredPersonnels() {
      return this.personnels.filter(personnel => personnel.department === this.form.department)
    }
  },
  created() {
    this.GetPersonnels()
    this.GetDepartment()
  },
  methods: {
    async GetPersonnels() { /* 重新发送请求 */
      const { data: Personnel } = await GetPersonnel()
      this.personnels = Personnel
    },
    async GetDepartment() { /* 重新发送请求 */
      const { data: Department } = await GetDepartment()
      this.departments = Department
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    openForm() { /* 打开表单 */
      this.dialogVisible2 = true
      this.form = {}
    },
    async sendId() { /* 发送验证身份请求 */
      const { data } = await SelectById(this.form.idCardNumber)
      if (data === null) {
        this.text0 = this.text1
      } else {
        this.text0 = this.text2
        this.form = data
      }
      this.dialogVisible2 = false
      this.dialogVisible1 = true
      // 使用 setTimeout 延时执行 resetFields
    },
    async add() {
      // eslint-disable-next-line no-unused-vars
      const a = await Add(this.form)
      this.dialogVisible1 = false
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 表单验证通过，可以执行提交操作
          this.add()
        } else {
          alert('请填写完表单')
        }
      })
    }
  },
  data() {
    return {
      personnels: [],
      departments: [],
      rules: {
        name: [
          { required: true, message: '请输入患者姓名', trigger: 'blur' }
        ],
        idCardNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '请输入生日', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选中性别', trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: '请选中婚姻情况', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        purpose: [
          { required: true, message: '请输入就诊目的', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选中就诊科室', trigger: 'blur' }
        ],
        doctorName: [
          { required: true, message: '请选中医生姓名', trigger: 'blur' }
        ],
        appointmentTime: [
          { required: true, message: '请选择就诊时间', trigger: 'blur' }
        ],
        insuranceCardNumber: [
          { required: true, message: '请输入医疗保险卡号', trigger: 'blur' }
        ],
        insuranceType: [
          { required: true, message: '请选择保险类型', trigger: 'blur' }
        ],
        allergyDescription: [
          { required: true, message: '请描述过敏史', trigger: 'blur' }
        ],
        paymentMethod: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ],
        settlementMethod: [
          { required: true, message: '请选择解算方式', trigger: 'blur' }
        ],
        emergencyContactName: [
          { required: true, message: '请输入紧急联系人姓名', trigger: 'blur' }
        ],
        emergencyContactPhone: [
          { required: true, message: '请输入紧急联系人电话', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请输入与患者关系', trigger: 'blur' }
        ],
        symptomDescription: [
          { required: true, message: '症状描述', trigger: 'blur' }
        ]
      },
      dialogVisible1: false,
      dialogVisible2: false,
      text0: '',
      text1: '此医院没有您的记录，请填写以下信息',
      text2: '此医院有您的记录，请核实以下信息',
      idCard: '',
      form: {
        patientId: '',
        name: '',
        idCardNumber: '',
        birthDate: null,
        gender: '',
        maritalStatus: '',
        contactPhone: '',
        address: '',
        purpose: '',
        department: '',
        doctorName: '',
        appointmentTime: null,
        insuranceCardNumber: '',
        insuranceType: '',
        allergyDescription: '',
        paymentMethod: '',
        settlementMethod: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        relationship: '',
        symptomDescription: '',
        state: '预约中'
      }
    }
  }
}
export default options
</script>

<style>
.registered{
  height: 20vh;
  width: 40vh;
  font-size: 80px;
}
.home{
  display: flex;
  align-items: center; /* 在垂直方向上居中 */
  justify-content: center; /* 在水平方向上居中 */
  height: 100vh;
  background-color: #e2e2e2;
}
</style>
