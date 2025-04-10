# 🌙 农历日历 MCP 服务器
![001011001101](https://github.com/user-attachments/assets/8c58b7f1-c347-4645-a3bb-c88775eb1e6e)


✨ 一个提供农历日期和凶吉查询的 MCP 服务器

## 🚀 功能特性

- 📅 `get_lunar` - 获取指定日期的农历信息
- 🔮 `get_taboo` - 查询当日宜忌事项

## 🛠️ 安装使用

接入配置：
```json
{
  "mcpServers": {
    "lunar": {
      "command": "tnpx",
      "args": [
        "-y",
        "lunar-calendar-mcp"
      ]
    }
  }
}
```

## 📦 技术栈

- Node.js
- TypeScript
- Model Context Protocol (MCP)

## 📜 开源协议

[MIT License](LICENSE)

## 🤝 贡献指南

欢迎提交 Issue 和 PR！

1. Fork 项目
2. 创建分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -am 'Add some feature'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建 Pull Request
