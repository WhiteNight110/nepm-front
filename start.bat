@echo off
setlocal

rem 定义项目文件夹路径
set PROJECT1=nepmfront-admin
set PROJECT2=nepmfront-gridmember
set PROJECT3=nepmfront-supervisor

rem 启动第一个项目
echo Starting project in %PROJECT1%
cd /d %PROJECT1%
start cmd /k "npm run serve"
cd ..

rem 启动第二个项目
echo Starting project in %PROJECT2%
cd /d %PROJECT2%
start cmd /k "npm run serve"
cd ..

rem 启动第三个项目
echo Starting project in %PROJECT3%
cd /d %PROJECT3%
start cmd /k "npm run serve"
cd ..

echo All projects have been started.
endlocal

