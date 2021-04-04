import string
from flask import Flask
from flask import request
from flask import jsonify
from flask import render_template
import utils
import spider
import json
app = Flask(__name__)
@app.route('/')
def hello_world():
    return render_template("world.html")
@app.route('/ajax',methods=["get","post"])
# def hello_world1():
#     return '100'
#
# @app.route('/tem')
# def hello_world2():
#     return render_template("index.html")
#获取时间动态
@app.route('/time')
def get_time():
    return utils.get_time()

@app.route('/c1')
def get_c1_data():
    data=utils.get_c1_data()
    return jsonify({"confirm":data[0],"suspect":data[1],"heal":data[2],"dead":data[3]})

@app.route('/c2')
def get_c2_data():
    res = []
    for tup in utils.get_c2_data():
        # print(tup)
        res.append({"name": tup[0], "value": int(tup[1]),"heal":int(tup[2]),"dead":int(tup[3])})
    return jsonify({"data": res})


@app.route("/l1")
def get_l1_data():
    data = utils.get_l1_data()
    day,confirm,suspect,heal,dead = [],[],[],[],[]
    for a,b,c,d,e in data:
        day.append(a.strftime("%m-%d")) #a是datatime类型
        confirm.append(b)
        suspect.append(c)
        heal.append(d)
        dead.append(e)
    return jsonify({"day":day,"confirm": confirm, "suspect": suspect, "heal": heal, "dead": dead})

@app.route("/l2")
def get_l2_data():
    data = utils.get_l2_data()
    day, confirm_add, suspect_add = [], [], []
    for a, b, c in data:
        day.append(a.strftime("%m-%d"))  # a是datatime类型
        confirm_add.append(b)
        suspect_add.append(c)
    return jsonify({"day": day, "confirm_add": confirm_add, "suspect_add": suspect_add})
@app.route("/r1")
def get_r1_data():
    data = utils.get_r1_data()
    city = []
    confirm = []
    for k,v in data:
        city.append(k)
        confirm.append(int(v))
    return jsonify({"city": city, "confirm": confirm})
@app.route('/r2')
def get_r2_data():
    res= []
    name=request.values.get("name")
    if (name == "全国"):
        res = []
        for tup in utils.get_pro():
            res.append({"name": addname(tup[0]), "value": int(tup[1]), "cityCode":
                getcode(tup[0]), "heal": int(tup[2]),
                        "dead": int(tup[3])})
    else:
        res = []
        for tup in utils.get_city(delname(name)):
            res.append({"name": addcityname(tup[1]), "value": int(tup[2]),
                        "heal": int(tup[3]), "dead": int(tup[4])})
        print(res)
    return jsonify({"data": res})
#获取表格数据
"""
The view function did not return a valid response. 
The return type must be a string, dict, tuple, Response instance, 
or WSGI callable, but it was a list.
"""
@app.route('/table')
def get_table():
    res=[]
    for tup in utils.get_world():
        res.append({"dt": tup[0], "c_name": tup[1], "confirm":tup[2],
                    "heal": tup[3], "dead": tup[4], "nowConfirm": tup[5]})
    # print(res)
    return jsonify({"data": res})
def addname(name):
    list=["北京","天津","上海","重庆"]
    list2=["内蒙古","西藏"]
    list3=["香港","澳门"]
    list4=["河北","山西","辽宁","吉林","黑龙江","江苏","浙江","安徽","福建","江西",
           "山东","河南","湖北","湖南","广东","海南","四川","贵州","云南",
           "陕西","甘肃","青海","台湾"]
    if(name in list):
        return name+"市"
    if(name in list2):
        return name+"自治区"
    if(name=="新疆"):
        return "新疆维吾尔自治区"
    if(name=="宁夏"):
        return "宁夏回族自治区"
    if(name=="广西"):
        return "广西壮族自治区"
    if(name in list3):
        return name+"特别行政区"
    if(name in list4):
        return name+"省"

def delname(name):
    list=["北京市","天津市","上海市","重庆市"]
    list2=["内蒙古自治区","西藏自治区"]
    list5=["宁夏回族自治区","广西壮族自治区"]
    list3=["香港特别行政区","澳门特别行政区"]
    list4=["河北省","山西省","辽宁省","吉林省","黑龙江省","江苏省","浙江省","安徽省","福建省","江西省",
           "山东省","河南省","湖北省","湖南省","广东省","海南省","四川省","贵州省","云南省",
           "陕西省","甘肃省","青海省","台湾省"]
    if(name in list):
        return name[0:len(name)-1]
    if(name in list2):
        return name[0:len(name)-3]
    if(name in list3):
        return name[0:len(name)-5]
    if(name in list4):
        return name[0:len(name)-1]
    if(name in list5):
        return name[0:len(name)-5]
    if(name=="新疆维吾尔自治区"):
        return "新疆"

def getcode(name):
    if(name=="全国"):
        return 100000
    if(name=="北京"):
        return 110000
    if(name=="天津"):
        return 120000
    if(name=="河北"):
        return 130000
    if(name=="山西"):
        return 140000
    if(name=="内蒙古"):
        return 150000
    if(name=="辽宁"):
        return 210000
    if(name=="吉林"):
        return 220000
    if(name=="黑龙江"):
        return 230000
    if(name=="上海"):
        return 310000
    if(name=="江苏"):
        return 320000
    if(name=="浙江"):
        return 330000
    if(name=="安徽"):
        return 340000
    if(name=="福建"):
        return 350000
    if(name=="江西"):
        return 360000
    if(name=="山东"):
        return 370000
    if(name=="河南"):
        return 410000
    if(name=="湖北"):
        return 420000
    if(name=="湖南"):
        return 430000
    if(name=="广东"):
        return 440000
    if(name=="广西"):
        return 450000
    if(name=="海南"):
        return 460000
    if(name=="重庆"):
        return 500000
    if(name=="四川"):
        return 510000
    if(name=="贵州"):
        return 520000
    if(name=="云南"):
        return 530000
    if(name=="西藏"):
        return 540000
    if(name=="陕西"):
        return 610000
    if(name=="甘肃"):
        return 620000
    if(name=="青海"):
        return 630000
    if(name=="宁夏"):
        return 640000
    if(name=="新疆"):
        return 650000
    if(name=="台湾"):
        return 710000
    if(name=="香港"):
        return 810000
    if(name=="澳门"):
        return 820000

def addcityname(name):
    if(name[len(name)-1]=='区'):
        return name
    if(name[len(name)-1]=='县'):
        return name
    return name+"市"
@app.route("/update_all")
def update_all():
    spider.update_history()
    spider.update_details()
    spider.insert_world()
    # utils.get_world()
    return "update"
if __name__ == '__main__':
    app.run()
