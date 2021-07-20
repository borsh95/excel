import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './../style/scss/main.scss';
import {Exel} from "@/assets/js/components/exel/Exel";
import {Toolbar} from "@/assets/js/components/toolbar/Toolbar";
import {Header} from "@/assets/js/components/header/Header";
import {Formula} from "@/assets/js/components/formula/Formula";
import {Table} from '@/assets/js/components/table/Table';

const exel = new Exel('#app', {
	components: [Header, Toolbar, Formula, Table],
});

exel.render();
