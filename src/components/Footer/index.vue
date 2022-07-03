<template>
  <div class="footer">
    <div class="wrap">
      <div class="copy">
        <p class="link">
          <a href="#">服务条款</a>
          <span> | </span>
          <a href="#">隐私政策</a>
          <span> | </span>
          <a href="#">版权投诉</a>
          <span> | </span>
          <a href="#">投资者关系</a>
          <span> | </span>
          <a href="#">广告合作</a>
          <span> | </span>
          <a href="#">廉正举报</a>
          <span> | </span>
          <a href="#">联系我们</a>
        </p>
        <p class="right">
          <span class="sep">网易公司版权所有©1997-2022</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="#">浙网文[2021] 1186-054号</a>
        </p>
        <p class="right">
          <a href="#">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
          <a href="#" class="police-link">
            <span class="police-logo"></span>
            <span class="police-text">浙公网安备 33010902002564号</span>
          </a>
        </p>
      </div>
      <ul class="enter">
        <li class="unit">
          <a href="#" class="logo-amped"></a>
          <span class="tt-amped"></span>
        </li>
        <li class="unit">
          <a href="#" class="logo-auth"></a>
          <span class="tt-auth"></span>
        </li>
        <li class="unit">
          <a href="#" class="logo-musician"></a>
          <span class="tt-musician"></span>
        </li>
        <li class="unit">
          <a href="#" class="logo-reward"></a>
          <span class="tt-reward"></span>
        </li>
        <li class="unit">
          <a href="#" class="logo-cash"></a>
          <span class="tt-cash"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="less" scoped>
.footer {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 172px;
  border-top: 1px solid #d3d3d3;
  background-color: #f2f2f2;
  .wrap {
    display: flex;
    justify-content: space-between;
    width: 980px;
    margin: 0 auto;
    padding-top: 15px;
    line-height: 24px;
    // background-color: pink;
    .link span {
      margin: 0 2px 0 4px;
    }
    .link a,
    .link span {
      color: #999;
    }
    .copy p a:hover {
      text-decoration: underline;
    }
    .copy .sep {
      margin-right: 14px;
    }
    .police-link {
      margin-left: 10px;
    }
    .police-logo {
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('~@/assets/police.png') no-repeat;
      background-size: cover;
      vertical-align: -2px;
    }
    .enter {
      width: 420px;
      height: 70px;
      display: flex;
      margin-top: 17px;
      .unit {
        flex: 1;
        display: flex;
        flex-direction: column;
        a {
          width: 50px;
          height: 45px;
          background: url('~@/assets/foot_enter_new.png') no-repeat -63px -456.5px;
          background-size: 110px 552px;
        }
        span {
          height: 14px;
          background: url('~@/assets/foot_enter_tt.png') no-repeat 0 -108px;
          background-size: 180px 139px;
          margin: 5px -1px 0;
        }
        .tt-amped {
          margin-left: -7px;
        }
        .logo-auth {
          background-position: -63px -101px;
        }
        .tt-auth {
          background-position: -1px -91px;
        }
        .logo-musician {
          background-position: 0 0;
        }
        .tt-musician {
          background-position: 0 0;
        }
        .logo-reward {
          background-position: -60px -50px;
        }
        .tt-reward {
          background-position: 0 -54px;
        }
        .logo-cash {
          background-position: 0 -101px;
        }
        .tt-cash {
          background-position: -1px -72px;
        }
      }
    }
  }
}
</style>