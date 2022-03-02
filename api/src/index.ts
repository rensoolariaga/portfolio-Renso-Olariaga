import server from './app';
import { startConnection } from './database'

const main = async() => {
    startConnection();
    await server.listen(server.get('port'));
    console.log(`Server on port: ${server.get('port')}`)
}

main();