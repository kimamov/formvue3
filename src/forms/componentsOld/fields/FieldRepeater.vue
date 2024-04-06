<template>
	<div class="field-repeater" :identifier="identifier">
		<h4 v-if="label && label!==''" class="field-repeater_label">{{label}} <span class="field-repeater_label-count">(max. {{ maxRepeats }})</span></h4>
		<child-dynamic-element
			v-for="(element, index) in elements"
			:element="{
				...element,
				repeatIndex: index,
				renderedItemsCount: renderedItemsCount,
				setActiveCount: (i)=>renderedItemsCount=i

			}"
			:key="element.identifier"
			:formName="formName"

		/>

	</div>
</template>

<script>
import {DynamicElement} from "formvue-json";

export default {
	name: "FieldRepeater",
	components: {
		"child-dynamic-element": DynamicElement,
	},
	data() {
		return{
			renderedItemsCount: 1,
		}
	},
	props: {
		properties: {
			type: Object | Array,
			required: true,
		},
		elements: {
			type: Array,
		},
		formName: {
			type: String,
			required: true,
		},
		identifier: {
			type: String
		},
		label: {
			type: String
		}
	},
	computed: {
		maxRepeats(){
			return parseInt(this.properties?.maxRepeats ?? 1);
		},
	},

	methods: {
	},

}
</script>

<style>

	.field-repeater{
		margin: 10px 0;
		padding: 20px 0;
	}
	*+.field-repeater{
		border-top: 1px solid black;
	}


</style>


