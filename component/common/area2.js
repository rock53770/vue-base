/*
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="format-detection" content="telephone=no"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<title>纯JS省市区联动</title>
<script type="text/javascript" src="js/jsAddress.js"></script>
</head>
<body>
<div>
省：<select id="cmbProvince"></select>
市：<select id="cmbCity"></select>
区：<select id="cmbArea"></select>
<br /><br />
省：<select id="Select1"></select>
市：<select id="Select2"></select>
区：<select id="Select3"></select>
<br /><br />
<input type="button" id="btn" style="width:200px;" value="获取选择的值">
<input type="datetime-local">
<script type="text/javascript">
addressInit('cmbProvince', 'cmbCity', 'cmbArea','浙江','杭州','杭州骏意');
addressInit('Select1', 'Select2', 'Select3');
document.querySelector("#btn").onclick = function(){
	var pro = document.querySelector("#cmbProvince").value;
	var city = document.querySelector("#cmbCity").value;
	var area = document.querySelector("#cmbArea").value;
	console.log(pro + " " + city + " " + area);
};
</script>
</div>
</body>
</html>
 */
var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea)
{
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);
     
    function cmbSelect(cmb, str)
    {
        for(var i=0; i<cmb.options.length; i++)
        {
            if(cmb.options[i].value == str)
            {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption(cmb, str, obj)
    {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerHTML = str;
        option.value = str;
        option.obj = obj;
    }
     
    function changeCity()
    {
        cmbArea.options.length = 0;
        if(cmbCity.selectedIndex == -1)return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for(var i=0; i<item.areaList.length; i++)
        {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
    }
    function changeProvince()
    {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if(cmbProvince.selectedIndex == -1)return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for(var i=0; i<item.cityList.length; i++)
        {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }
     
    for(var i=0; i<provinceList.length; i++)
    {
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
};
 
var provinceList = [
{ name: '请选择省份', cityList: [{ name: '请选择城市', areaList: ['请选择经销商'] }] }
, { name: '上海', cityList: [{ name: '上海', areaList: ['上海意特（浦西展厅）', '上海骏霖'] }] }
, { name: '北京', cityList: [{ name: '北京', areaList: ['北京和谐', '北京骏东'] }] }
, { name: '天津', cityList: [{ name: '天津', areaList: ['天津利骏行'] }] }
, { name: '重庆', cityList: [{ name: '重庆', areaList: ['重庆骏东'] }] }
, { name: '浙江', cityList: [{ name: '台州', areaList: ['台州捷顺'] }, { name: '嘉兴', areaList: ['嘉兴恒骏'] }, { name: '宁波', areaList: ['宁波博骏'] }, { name: '杭州', areaList: ['杭州骏意'] }, { name: '温州', areaList: ['温州捷骏'] }, { name: '绍兴', areaList: ['绍兴博骏'] }, { name: '金华', areaList: ['义乌博骏'] }] }
, { name: '江苏', cityList: [{ name: '南京', areaList: ['南京润之意'] }, { name: '南通', areaList: ['南通润之意'] }, { name: '常州', areaList: ['常州常骏行'] }, { name: '徐州', areaList: ['徐州润之意'] }, { name: '无锡', areaList: ['无锡龙骏行'] }, { name: '苏州', areaList: ['苏州意骏'] }] }
, { name: '江西', cityList: [{ name: '南昌', areaList: ['南昌永邦'] }] }
, { name: '云南', cityList: [{ name: '昆明', areaList: ['云南康顺'] }] }
, { name: '黑龙江', cityList: [{ name: '哈尔滨', areaList: ['哈尔滨尊荣亿方'] }] }
, { name: '辽宁', cityList: [{ name: '大连', areaList: ['大连尊荣亿方'] }, { name: '沈阳', areaList: ['沈阳尊荣亿方'] }] }
, { name: '安徽', cityList: [{ name: '合肥', areaList: ['安徽鸿粤'] }] }
, { name: '四川', cityList: [{ name: '成都', areaList: ['成都保利', '成都骏意'] }] }
, { name: '湖北', cityList: [{ name: '武汉', areaList: ['武汉康顺'] }] }
, { name: '福建', cityList: [{ name: '厦门', areaList: ['福建骏佳'] }, { name: '泉州', areaList: ['泉州明冠'] }, { name: '福州', areaList: ['福州欧利行'] }] }
, { name: '海南', cityList: [{ name: '海口', areaList: ['海口惠通嘉华'] }] }
, { name: '广东', cityList: [{ name: '东莞', areaList: ['东莞玛莎法利'] }, { name: '佛山', areaList: ['佛山明冠'] }, { name: '广州', areaList: ['广东骏佳'] }, { name: '深圳', areaList: ['深圳保利', '深圳骏佳'] }] }
, { name: '吉林', cityList: [{ name: '长春', areaList: ['长春尊荣亿方'] }] }
, { name: '河南', cityList: [{ name: '郑州', areaList: ['郑州法利'] }] }
, { name: '山东', cityList: [{ name: '济南', areaList: ['济南润之意'] }, { name: '青岛', areaList: ['青岛福日'] }] }
, { name: '山西', cityList: [{ name: '太原', areaList: ['山西骏东'] }] }
, { name: '贵州', cityList: [{ name: '贵阳', areaList: ['贵州中致远'] }] }
, { name: '陕西', cityList: [{ name: '西安', areaList: ['陕西骏东'] }] }
, { name: '湖南', cityList: [{ name: '长沙', areaList: ['长沙利骏行'] }] }
, { name: '广西', cityList: [{ name: '南宁', areaList: ['南宁中致远'] }] }
, { name: '内蒙古', cityList: [{ name: '呼和浩特', areaList: ['呼和浩特玛莎法利'] }] }
];