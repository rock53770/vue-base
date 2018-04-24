<template>
  <div class="">
    <div class="info">
      <h1>flex</h1>
      <ul class="box">
        <li>
          <p>一：容器的属性</p>
          <p class="p2">
            1.flex-direction: row | row-reverse | column | column-reverse  <br>
            2.flex-wrap: no-wrap | wrap | wrap-reverse  <br>
            3.flex-flow: flex-direction + flex-wrap <br>
            4.justify-content: flex-start | flex-end | center | space-between | space-around <br>
            5.align-items: flex-start | flex-end | center | baseline | stretch <br>
          </p>
          <p>二：项目的属性</p>
          <p class="p2">
            1.order:   <br>
            2.flex-grow:  0 <br>
            3.flex-shrink: 1 <br>
            4.flex-basis: auto <br>
            5.flex: auto(1 1 auto) none(0 0 auto) <br>
            5.align-self: auto | flex-start | flex-end | center | baseline | stretch <br>
          </p>
        </li>
      </ul>
      <div class="show-mask lh80" @click="showMask()" >显示</div>
      <div class="mask-box" v-if="mask" v-scroll>
        <div class="pop" id="pop">
          <div class="hide lh50" @click="hideMask()">隐藏</div>
          老干妈遭泄密：一家食品公司内竟上演谍战片】记者8日从贵阳南明警方处获悉：历经三个多月的侦查，贵阳市公安局南明分局经侦大队一举将涉嫌泄露贵阳南明老干妈风味食品有限责任公司商业机密的贾某抓捕归案，该案涉案金额高达千万元人民币。

          2016年5月，“老干妈”工作人员发现本地另一家食品加工企业生产的一款产品与老干妈品牌同款产品相似度极高。该事件引起了老干妈公司的警觉，公司相关人员认为此现象很可能存在重大商业机密的泄露。

          2016年11月8日，老干妈公司到贵阳市公安局南明分局经侦大队报案，称疑似公司重大商业机密遭到窃取。

          接到报案后，南明经侦大队高度重视。侦查人员从市场上购买了疑似窃取老干妈商业机密的另一品牌同类产品，将其送往司法鉴定中心，鉴定结果为该产品含有“老干妈牌”同类产品制造技术中不为公众所知悉的技术信息。

          经查，涉嫌窃取此类技术的企业从未涉足该领域，绝无此研发能力。老干妈公司也从未向任何一家企业或个人转让该类产品的制造技术。由此，可以断定，有人非法披露并使用了老干妈公司的商业机密。

          鉴于案情紧急重大，南明经侦大队逐将案情向分局领导进行了专题汇报。分局领导闻讯，当即责成经侦大队成立专案组，组织精干力量，多策并举，慎密侦查，尽快查清犯罪嫌疑人的真实身份和落脚之处。

          经多方了解和仔细排查，侦查人员将注意力最终锁定到老干妈公司离职人员贾某身上。2003年至2015年4月，贾某历任老干妈公司质量部技术员，工程师等职，掌握老干妈公司专有技术、生产工艺等核心机密信息。2015年11月，贾某以假名做掩护在本地另一家食品加工企业任职，从事质量技术管理相关的工作。


          涉嫌商业秘密泄露的案件中，大量的证据均是以电子文档的形式存在的，其证据一般都是随身携带。围绕这一线索，办案侦查员展开调查，依法搜查扣押了贾某随身携带的移动硬盘及内含的电子证据资料，并在其台式电脑中发现大量涉及老干妈公司商业秘密的内部资料，这也印证了办案人员的判断。

          贾某在其任职期间，与老干妈公司签订了“竞业限制与保密协议”，约定贾某在工作期间及离职后需保守公司的商业秘密，且不能从事业务类似及存在直接竞争关系的经营活动。

          自2015年11月，贾某将在老干妈公司掌握和知悉的商业机密用在另一家食品加工企业的生产经营中，并进行生产，企图逃避法律的约束和制裁。

          根据《中华人民共和国刑法》第二百一十九条，有违反约定或者违反权利人有关保守商业秘密的要求，披露、使用或者允许他人使用其所掌握的商业秘密行为，给商业秘密的权利人造成重大损失的，造成特别严重后果的，处三年以上七年以下有期徒刑，并处罚金。

          目前，嫌疑人贾某因涉嫌侵犯商业秘密案，已被刑事拘留。(记者 张伟)

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      mask: false
    }
  },
  mounted () {
    this.$emit('changePage', {showFooter: false})
    var vm = this;
    document.querySelector(".box").addEventListener("touchmove",function(e){
      if(vm.mask){
        e.preventDefault();
      }
    },false);
//    console.log(111)
  },
  methods:{
    showMask (){
      this.mask = true;
    },
    hideMask (){
      this.mask = false;
    }
  }

}
</script>
