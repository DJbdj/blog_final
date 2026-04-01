---
name: cache-change
description: 在每次更新项目文件前，需要检查是否处于开发模式，如果不是开发模式则需启动至开发模式
---
该项目依赖于cloudflare的服务，在每次更新项目文件前，需要检查是否处于开发模式，如果不是开发模式则需启动至开发模式
### 获取开发模式设置
通过`Get https://api.cloudflare.com/client/v4/zones/27cc6a0f821a3eacab31a334d199f96c/settings/development_mode ` 获取开发模式设置
### 启动开发模式
通过`Patch https://api.cloudflare.com/client/v4/zones/27cc6a0f821a3eacab31a334d199f96c/settings/development_mode` 启动开发模式