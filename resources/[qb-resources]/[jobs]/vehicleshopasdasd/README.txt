Add the following to qb-core/client/functions.lua

QBCore.Functions.ShowFloatingHelpNotification = function(msg, coords)
	AddTextEntry('FloatingHelpNotification', msg)
	SetFloatingHelpTextWorldPosition(1, coords)
	SetFloatingHelpTextStyle(1, 1, 2, -1, 3, 0)
	BeginTextCommandDisplayHelp('FloatingHelpNotification')
	EndTextCommandDisplayHelp(2, false, false, -1)
end