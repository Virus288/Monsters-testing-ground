buildDebug:
	clear \
	&& yarn build:debug \
	&& yarn build:linux \
	&& yarn build:windows \
	&& notify-send 'Monsters testing ground: Build created'

build:
	clear \
	&& yarn build \
	&& yarn build:linux \
	&& yarn build:windows \
	&& notify-send 'Monsters testing ground: Build created'
