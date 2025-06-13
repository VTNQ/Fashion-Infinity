# Sử dụng Node.js LTS
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Copy các file cấu hình trước (tận dụng cache Docker)
COPY package*.json ./

# Cài dependencies
RUN npm install  --legacy-peer-deps

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng ứng dụng React
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
