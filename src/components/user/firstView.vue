<template>
    <div style="height: 100%;">
        <div class="main-contanue">
            <div class="toolbar">
                <img src="../../assets/icon-logo.png">
                <img class="pull-right" src="../../assets/icon-plus.png" @click="addView">
            </div>
            <div style="margin-top: 20px;width:100%;">
                <el-radio-group v-model="status" size="small" style="width: 100%;" @change="onType">
                <el-radio-button label="新订单" style="width:33.3%"></el-radio-button>
                <el-radio-button label="已发货" style="width:33.3%"></el-radio-button>
                <el-radio-button label="全部" style="width:33.3%"></el-radio-button>
                </el-radio-group>
            </div>
            <el-row style="overflow: scroll;height: 80%;">
                <el-col :span="24" v-for="o in data" :key="o">
                    <el-card :body-style="{ padding: '0px' }">
                    <div style="text-align: left;">
                        <span>({{o.pNum}} 箱 {{o.pType}}) {{o.userName}} {{o.phoneNum}} </span>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button" @click="doCopy(o.userName,o.phoneNum,o.address)">复制地址</el-button>
                        </div>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                status:'已发货',
                data:[{
                    userName:'毛易强',
                    phoneNum:'18077483549',
                    pType:'默科特',
                    pNum:1,
                    address:'广州市番禺区'
                }],
                getUrl:'http://nytlrj.hn3.mofasuidao.cn/Epidemic/getList'
            }
        },mounted(){
            this.getListFunc();
        },methods:{
            onType(el){
                this.getListFunc();
            },
            getListFunc(){
                this.$http.get(this.getUrl+"?status="+this.status)
                    .then((res)=>{
                        if(res.data.code == 0) {
                            this.data=res.data.data
                        }
                    },(res)=>{
                    })
            },
            closeTip() {
                this.tipShow = false;
            },
            addView() {
                 window.location.href='buy'
            },
            doCopy: function (userName,phoneNum,address) {
                this.$copyText(userName+" "+phoneNum+" "+address).then(function (e) {
                alert('Copied')
                console.log(e)
            }, function (e) {
                alert('Can not copy')
                    console.log(e)
                })
            }
        }
    }
</script>
<style>
    .el-radio-group label span {
        width: 100%;
        border-radius:0px !important;
    }
</style>