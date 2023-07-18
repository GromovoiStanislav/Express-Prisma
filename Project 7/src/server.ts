import 'dotenv/config'
import {app} from './app'

const bootstrap = () => {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
}

bootstrap()