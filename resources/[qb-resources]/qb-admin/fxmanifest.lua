fx_version 'cerulean'
game 'gta5'

description 'QB-Admin'
version '1.0.0'

client_scripts {
    'client/main.lua',
    'client/noclip.lua',
    '@warmenu/warmenu.lua',
}

server_scripts {
    'server/main.lua'
}

dependencies {
    'qb-core',
    'warmenu'
}