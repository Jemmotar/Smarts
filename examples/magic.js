/*
const Source = {
	O2: 'SNMS-o2',
	DCNV: 'SNMS-DCNV',
	3G: 'SNMS-3g'
	RicketBengister: 'SNMS-RB'
};

const Class = {

};

const Event = {
	linkDow: 'linkDown',
	ConfigCahnge: 'ConfigCahnge'
};

for (const key in Source){
	console.log(Source[key]);
}
*/

/* ------------------ */

/*

// O2 trap test and filter
const Trap = {
	Source: 'SNMS-02',
	InstaceName: 'Performace',
	Name: 'ahojSPANasdasdas'
};

const result =
	Trap.Source === 'SNMS-02' &&
	Trap.InstaceName === 'Performace' &&
	(!Trap.Name.includes('@HUP@') && !Trap.Name.includes('SPAN'));
*/

// Sheet 5 for SNMS-RB
const Trap = {
	Source: 'SNMS-RB',
	Event: 'MuchKek',
	EventText: 'oh lel',
	Name: 'Gi2/20'
};

const result =
	Trap.Source === 'SNMS-RB' &&
	(Trap.Event !== 'HighDiscardRate' && Trap.Event !== 'DownOrFlapping' && Trap.Event !== 'linkDown' && Trap.Event !== 'ConfigChange') &&
	(!Trap.EventText.includes('NATIVE_WLAN_MISMATCH') && !Trap.EventText.includes('DUPLEX_MISMATCH') && !Trap.EventText.includes('Probe_State_Change')) &&
	(!Trap.Name.includes('Gi2/25') && Trap.Name.includes('Gi2/26') && Trap.Name.includes('Gi2/27') && Trap.Name.includes('Gi2/28') && !/VOLT-gb02qsw010rbbf7.+Te.+/g.test(Trap.Name) && !/VOLT-gb01qsw020rbbf7.reckitt.snms.+Te.+/g.test(Trap.Name) && !/VOLT-gb01qsw010rbbf7.reckitt.snms.+Te.+/g.test(Trap.Name));

console.log(result);
