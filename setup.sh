#!/bin/bash

# Mokai Cyber - Quick Setup Script
# Gets you from zero to running in 5 minutes

echo "🚀 Mokai Cyber - Essential Eight MVP Setup"
echo "==========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js detected: $(node -v)"
echo ""

# Initialize Next.js if not already done
if [ ! -f "package.json" ]; then
    echo "📦 Initializing Next.js project..."
    npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --use-npm
    echo ""
fi

echo "📥 Installing required dependencies..."
npm install @clerk/nextjs @prisma/client prisma @tanstack/react-query axios lucide-react

echo ""
echo "🎨 Setting up shadcn/ui..."
npx shadcn-ui@latest init -y

echo ""
echo "🔧 Adding essential shadcn components..."
npx shadcn-ui@latest add card table button form input badge alert toast

echo ""
echo "🗄️ Initializing Prisma..."
npx prisma init

echo ""
echo "✨ Setup complete!"
echo ""
echo "📝 NEXT STEPS:"
echo "1. Set up Railway PostgreSQL database"
echo "2. Copy connection string to .env"
echo "3. Copy schema from instructions/data-model.md to prisma/schema.prisma"
echo "4. Run: npx prisma db push"
echo "5. Set up Clerk account and add keys to .env"
echo "6. Run: npm run dev"
echo ""
echo "⏰ Remember: You have 14 days to ship!"
echo "📖 Read instructions/STOP_READ_FIRST.md before writing any code"
