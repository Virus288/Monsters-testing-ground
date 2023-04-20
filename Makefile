buildDebug:
	clear \
	&& yarn build:debug \
	&& yarn build:linux \
	&& yarn build:windows \
	&& notify-send 'Gameinn_3: Build created'

build:
	clear \
	&& yarn build \
	&& yarn build:linux \
	&& yarn build:windows \
	&& notify-send 'Gameinn_3: Build created'
