const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

const dotenv = require('dotenv');
const { error } = require('node:console');
dotenv.config();
const { TOKEN } = process.env;

const fs = require('node:fs');
const path = require('node:path');
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execulte" in command){
        client.commands.set(command.data.name, command);
    } else {
        console.log(`esse comando em ${filePath} esta com 'data' ou 'execulte' ausente `);
    }
}

client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error('Comando nao encontrado')
        return
    }
    try{
        await command.execulte(interaction)
    } catch {
        console.error(error)
        await interaction.reply("Houve um erro ao execultar esse comando!")
    }

});