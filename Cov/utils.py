from idlelib import query

import pymysql
import time
def get_time():
    time_str =  time.strftime("%Y{}%m{}%d{} %X")
    return time_str.format("年","月","日")
"""
------------------------------------------------------------------------------------
"""
def get_conn():
    """
    :return: 连接，游标
    """
    # 创建连接
    conn = pymysql.connect(host="127.0.0.1",
                    user="root",
                    password="000429",
                    db="mydb",
                    charset="utf8")
    # 创建游标
    cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
    return conn, cursor

def close_conn(conn, cursor):
    if cursor:
        cursor.close()
    if conn:
        conn.close()
"""
------------------------------------------------------------------------------------
"""
def query(sql,*args):
    """
    通用封装查询
    :param sql:
    :param args:
    :return:返回查询结果 （（），（））
    """
    conn , cursor= get_conn()
    print(sql)
    cursor.execute(sql)
    res = cursor.fetchall()
    close_conn(conn , cursor)
    return res
"""
------------------------------------------------------------------------------------
"""
def get_c1_data():
    """
    返回div id= c1 的数据
    取最新数据
    :return:
    """
    sql = "select sum(confirm),"\
        "(select suspect from history order by ds desc limit 1),"\
        "sum(heal),"\
        "sum(dead) "\
        "from details "\
        "where update_time=(select update_time from details order by update_time desc limit 1)"
    res=query(sql)
    return res[0]
#返回各省数据
def get_c2_data():
    sql = "select province,sum(confirm),sum(heal),sum(dead) from details "\
            "where update_time=(select update_time from details "\
            "order by update_time desc limit 1) "\
            "group by province "
    res=query(sql)
    return res
"""
------------------------------------------------------------------------------------
"""
def get_l1_data():

	sql = "select ds,confirm,suspect,heal,dead from history"
	res = query(sql)
	return res

def get_l2_data():

	sql = "select ds,confirm_add,suspect_add from history"
	res = query(sql)
	return res


def get_r1_data():
    """
    :return:  返回非湖北地区城市确诊人数前5名
    """
    sql = 'SELECT city,confirm FROM ' \
          '(select city,confirm from details  ' \
          'where update_time=(select update_time from details order by update_time desc limit 1) ' \
          'and province not in ("湖北","北京","上海","天津","重庆") ' \
          'union all ' \
          'select province as city,sum(confirm) as confirm from details  ' \
          'where update_time=(select update_time from details order by update_time desc limit 1) ' \
          'and province in ("北京","上海","天津","重庆") group by province) as a ' \
          'ORDER BY confirm DESC LIMIT 5'
    res = query(sql)
    return res
def get_pro():
    sql = "select province,sum(confirm),sum(heal),sum(dead) from details "\
            "where update_time=(select update_time from details "\
            "order by update_time desc limit 1) "\
            "group by province "
    res=query(sql)
    return res
def get_city(pro_name):
    sql = 'SELECT province,city,confirm,heal,dead FROM details ' \
         'where update_time=(select update_time from details order by update_time desc limit 1) '\
          ' and city not in ("境外输入","地区待确认") '
    res=query(sql)
    result=[]
    for temp in res:
        # print(temp[0])
        # print(temp)
        if(temp[0]==pro_name):
            result.append(temp)
    return result
def get_world():
    sql="SELECT dt, c_name,confirm,heal,dead,nowConfirm FROM world  " \
        "WHERE dt=(SELECT dt FROM world order by dt desc limit 1) " \
        "order by confirm desc; "
    res=query(sql)
    # print(res)
    list=[]
    for i in res:
        list.append(i)
    # print(list)
    return list;

def find_worldByName(c_name,continent,y,m,d):
    print(c_name)
    print(continent)
    sql = " SELECT * FROM world WHERE  1=1 "
    if(c_name!=None):
        sql=sql+"AND ( c_name LIKE '%"+c_name+"%' )"
    if(continent!=None):
        sql=sql+" AND ( continent LIKE '%"+continent+"%') "
    if((y!=None)&(m!=None)&(d!=None)&(y!="")&(m!="")&(d!="")):
        dtft = y + "-" + m + "-" + d + " " + "00:00:00"
        print(dtft)
        sql=sql+"AND (dt='"+dtft+"')"
    sql = sql + " order by confirm desc "
          # "AND continent LIKE '%%%%%s%%%%'" \
          # " order by dt desc " %(c_name,continent)
    # sql_temp = " SELECT * FROM world WHERE c_name LIKE '%"+c_name+"%' "
    res = query(sql)
    list= []
    for i in res:
        # print(i)
        list.append(i)
    return list;
# def find_worldByContinent(continent):
#     sql = " SELECT * FROM world WHERE continent LIKE '%%%%%s%%%%'" %continent
#     res = query(sql)
#     # print(res)
#     list=[]
#     for i in res:
#         list.append(i)
#     return list;

if __name__ == '__main__':
        # res=get_city("河北")
        # print(res)
        # print(res[0][0])
        res=find_worldByName("中国","亚洲","21","4","11");
        print(res)
        # print(res)
        # res=find_worldByContinent("北美洲")
        # print(res)
        # res=get_world();
        # print(res)