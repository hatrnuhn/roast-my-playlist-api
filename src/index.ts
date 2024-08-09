import 'dotenv/config'
import server from './server'
import { checkEnv } from './config/env'

checkEnv()

const port = parseInt(process.env.PORT!) || 3000

server.listen(port, () => console.log(`Server running on port ${port}`))