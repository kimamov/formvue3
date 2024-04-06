<template>
	<div class="field-repeater_content" :identifier="identifier">
		<input :required="required" readonly :value="isActive" :name="name" type="checkbox" class="hidden-checkbox">

		<div v-if="isActive && !isFirstItem" class="field-repeater_controls">
			<v-btn v-if="isLastEnabledItem" title="Felder entfernen" right class="field-repeater_remove-btn" @click="removeItem" icon>
				<v-icon color="white">mdi-close</v-icon>
			</v-btn>
		</div>

		<child-dynamic-element
			v-for="element in elements"
			:element="{ ...element, conditionalValue: isActive }"
			:key="element.identifier"
			:formName="formName"
			:conditionalValue="isActive"
		/>
		<div class="field-repeater_add_wrapper" v-bsif="isNextDisabledItem">
			<v-btn title="Felder hinzufügen" icon class="field-repeater_add-btn"  @click="addItem">
				<v-icon color="white">mdi-plus</v-icon>
			</v-btn>
		</div>

	</div>
</template>

<script>
import {DynamicElement, isRequired} from "formvue-json";

export default {
	name: "RepeatedContent",
	components: {
		"child-dynamic-element": DynamicElement,
	},
	computed: {
		required() {
			return isRequired(this.properties);
		},
		isFirstItem(){
			return !this.properties.repeat || this.properties.repeat===1;
		},
		isActive(){
			return this.renderedItemsCount>this.repeatIndex || this.isFirstItem
		},
		isNextDisabledItem(){
			return !this.isActive && this.repeatIndex===this.renderedItemsCount;
		},
		isLastEnabledItem(){
			return !this.isFirstItem && this.isActive && this.repeatIndex===this.renderedItemsCount-1;
		}

	},
	methods:{
		addItem(){
			this.setActiveCount(this.renderedItemsCount+1)
		},
		removeItem(){
			this.recursivelyResetAllElementsValues(this.elements)
			this.setActiveCount(this.renderedItemsCount-1)
		},
		recursivelyResetAllElementsValues(elements){
			for(let element of elements){
				this.$store.commit("updateInputValue", { key: element.identifier, value: "" });
				if(element.elements) this.recursivelyResetAllElementsValues(element.elements);
			}
		}
	},
	props: {
		formName: {
			type: String,
			required: true,
		},
		properties: {
			type: Object | Array,
			required: true,
		},
		name: {
			type: String,
			required: true
		},
		elements: {
			type: Array,
		},
		identifier: {
			type: String
		},
		label: {
			type: String
		},
		repeatIndex: {
			type: Number,
		},

		renderedItemsCount: {
			type: Number,
		},
		setActiveCount: {
			type: Function,
		}

	},



}
</script>

<style lang="scss" scoped>
.field-repeater_content{
	&>.hidden-checkbox{
		position: absolute;
		height: 0;
		width: 0;
		margin: 0;
		padding: 0;
		opacity: 0;
		&:before{
			display: none;
		}
	}
	.field-repeater_controls{
		text-align: right;
		margin: 12px 0;
		min-height: 40px;
	}
	.field-repeater_remove-btn, .field-repeater_add-btn{
		background: black !important;
	}

	.field-repeater_add_wrapper{
		text-align: center;
		margin: 12px 0;
	}
}
</style>
