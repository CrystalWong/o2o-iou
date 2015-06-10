o2o-iou
===============
第一次安装：
安装nodejs（自带npm）
npm install -g grunt-cli bower
cd ${your_working_space}
git clone http://code.hoolai.com/git/hongcai/o2o-iou.git
cd o2o-iou
cp Gruntfile.example.js Gruntfile.js
(修改Gruntfile.js的hostname、port等配置)
npm install
bower install
grunt serve
