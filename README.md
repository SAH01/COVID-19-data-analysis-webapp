# myCov
世界、中国新冠疫情数据多图表展示大屏网站。Python爬虫爬取疫情相关数据并结合echarts进行展示。
（数据来自2021年初）
![image](https://user-images.githubusercontent.com/72775628/160058507-c152bc45-6b50-4041-a1ab-17f2201f0ead.png)




---


![image](https://user-images.githubusercontent.com/72775628/160058544-3dc23d5c-d8c2-4023-bb13-2507515231ca.png)


---



![image](https://user-images.githubusercontent.com/72775628/160058576-49431f53-6c85-4e73-a46f-c698b9c43b88.png)
![image](https://user-images.githubusercontent.com/72775628/160058589-379e18b0-84fd-4c17-b29f-b6acb96d935b.png)

![image](https://user-images.githubusercontent.com/72775628/160058617-e7235947-e492-4010-bbeb-3a3eaeb996bd.png)
![image](https://user-images.githubusercontent.com/72775628/160058648-b24f7cbe-d636-4bcf-91d3-e4c90cd517c1.png)

![image](https://user-images.githubusercontent.com/72775628/160058672-011a8604-6c17-4fd7-8ec2-c5ebb0a17959.png)
![image](https://user-images.githubusercontent.com/72775628/160058684-4898f053-954c-4cef-a017-a3a5bf1cf916.png)



----

单击**左上角按钮**可以切换中国和世界展示界面！

![image](https://user-images.githubusercontent.com/72775628/160058703-c36421c5-f631-40be-a25c-b19c6b29cc34.png)

![image](https://user-images.githubusercontent.com/72775628/160058730-a60b7a74-2990-4b71-b28c-8420656335be.png)

![image](https://user-images.githubusercontent.com/72775628/160058754-1105ce34-03a3-40be-af06-103c7b292dfc.png)

![image](https://user-images.githubusercontent.com/72775628/160058773-acbb1828-8e18-45b1-982e-874d61bb7c7c.png)

**图表联动高亮显示**
![image](https://user-images.githubusercontent.com/72775628/160059019-a0417fc5-f530-4ed6-89f3-68659cde473d.png)
**多条件模糊查询**
![image](https://user-images.githubusercontent.com/72775628/160059098-3bb02fca-0ed7-4dcf-9b28-1c823cd8ee3b.png)

-----



## 项目简介：

项目分为两个板块：

- 一个是中国的疫情数据可视化，包括全国累计趋势折线图、全国新增趋势折线图、全国累计数据、全国疫情地图、非湖北城市TOP5柱状图、**全国地图实现省市下钻数据展示**。
- 另一个是世界疫情数据可视化，包括世界累计数据、疫情趋势折线图、世界地图可视化展示、**实现了地图和表格展示图表联动**（鼠标放在地图或表格上对应部分高亮显示）。

## 代码结构：

1. sql下是后台数据库备份文件
2. 下面四个文件是静态资源

![image](https://user-images.githubusercontent.com/72775628/160058816-e3901262-e967-49b3-af80-2fd824c3a90e.png)

---
![image](https://user-images.githubusercontent.com/72775628/160058827-f152b346-757d-4fa7-904a-3bc02171d46c.png)

3. china对应中国疫情板块、world对应世界疫情板块。
4. 下面的app.py是flask框架的主要实现部分。
5. spider.py是爬虫文件，主要负责爬取疫情数据（来自腾讯）。
6. utils.py实现前后端数据交互（mysql数据库传送数据到前台页面展示）。



