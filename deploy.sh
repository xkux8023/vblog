#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git remote add origin https://github.com/xkux8023/xkux8023.github.io.git
# git push -u origin master

# git push -f https://github.com/xkux8023/xkux8023.github.io.git master

# git remote add origin https://gitee.com/coder-9527/blog.git
# git push -u origin master
git push -f https://gitee.com/coder-9527/blog.git master


# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
