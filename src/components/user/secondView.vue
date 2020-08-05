<template>
    <div style="height: 100%;">
        <div style="width:100%;border-bottom:1px solid #bbbbbb;font-size: 1.1rem;ma">
            <span>请旅客按照所持车票信息填入</span>
        </div>
            <el-row>
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="姓名" prop="userName">
                        <el-input v-model="form.userName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNum">
                        <el-input v-model="form.phoneNum" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="乘车日期" prop="takeDate">
                        <el-col>
                        <el-date-picker type="date" placeholder="" value-format="yyyy-MM-dd" v-model="form.takeDate" style="width: 100%;" size="small"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="上车车站" prop="takeStation">
                        <el-input v-model="form.takeStation" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="乘坐车次" prop="takeCarId">
                        <el-input v-model="form.takeCarId" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="车厢号" prop="TrainNum">
                        <el-input v-model="form.TrainNum" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="座位信息" prop="seat">
                        <el-radio-group v-model="form.seat" size="small">
                            <el-radio label="01" border>有座</el-radio>
                            <el-radio label="02" border>无座</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="座位号" size="small">
                        <el-input v-model="form.seatId"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="addPageInfo">确认提交</el-button>
            </el-row>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                addUrl:this.service.url+'epidemic/report',
                form:{
                    id:1,
                    userName:'',
                    takeDate:'',
                    phoneNum:'',
                    takeStation:'',
                    takeCarId:'',
                    TrainNum:'',
                    seat:'',
                    seatId:''
                },
                rules:{
                    userName:[{
                        required:true,message:'请输入姓名',trigger: 'blur'
                    }],
                    takeDate:[{
                        required:true,message:'请输入乘车日期',trigger: 'blur'
                    }],
                    phoneNum:[{
                        required:true,message:'请输入电话号码',trigger: 'blur'
                    }],
                    takeStation:[{
                        required:true,message:'请输入上车车站',trigger: 'blur'
                    }],
                    takeCarId:[{
                        required:true,message:'请输入乘坐车次',trigger: 'blur'
                    }],
                    TrainNum:[{
                        required:true,message:'请输入车厢号',trigger: 'blur'
                    }],
                    seat:[{
                        required:true,message:'请选择座位信息',trigger: 'blur'
                    }]
                }
            }
        },methods:{
            addPageInfo() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.addUrl,JSON.stringify(this.form),{emulateJSON: true})
                    .then((res)=>{
                        var data = res.data;
                        if(data.code == 1) {
                            this.$notify.success({
                                title: '成功',
                                message: data.message
                            });
                            
                            window.location.href='first'
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: data.message
                            });
                        }

                    },(res)=>{
                        this.$alert('服务器异常', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        })
                    })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
<style type="text/css">
    .el-form .el-form-item {
        width:90%;
        margin-bottom:10px;
    }
    .el-row .el-button {
        margin-top: 30px;
        padding: 12px 40px;
        width: 80%;
    }
</style>