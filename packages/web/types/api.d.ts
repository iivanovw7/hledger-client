export type DecimalQuantity = {
	decimalMantissa: number;
	decimalPlaces: number;
	floatingPoint: boolean;
};

export type AmountStyle = {
	ascommodityside: string;
	ascommodityspaced: boolean;
	asdecimalmark: string;
	asdigitgroups: string;
	asprecision: number;
	asrounding: string;
};

export type Amount = {
	acommodity: string;
	acost?: {
		contents: {
			acommodity: string;
			acost: string;
			aquantity: DecimalQuantity;
			astyle: AmountStyle;
		};
		tag: string;
	};
	aquantity: DecimalQuantity;
	astyle: AmountStyle;
};

/* /accountnames */
export type AccountNameRespose = string;
export type AccountNameListResponse = AccountNameResponse[];

/* /transactions */
export type Posting = {
	paccount: string;
	pamount: Amount[];
	pbalanceassertion?: string;
	pcomment?: string;
	pdate: string;
	pdate2?: string;
	poriginal?: string;
	pstatus?: string;
	ptags?: string;
	ptransaction_: string;
	ptype: string;
};

export type TransactionSourcePosition = {
	sourceColumn: number;
	sourceLine: number;
	sourceName: string;
};

export type Transaction = {
	tcode?: string;
	tcomment?: string;
	tdate: string;
	tdate2?: string;
	tdescription: string;
	tindex: number;
	tpostings: Posting[];
	tprecedingcomment?: string;
	tsourcepos: TransactionSourcePosition[];
	tstatus?: string;
	ttags?: string;
};

export type TransactionsResponse = Transaction[];

/* /prices */
export type Price = {
	mpdate: string;
	mpfrom: string;
	mprate: DecimalQuantity;
	mpto: string;
};

export type PricesResponse = Price[];

/* /commodities */
export type Commodity = string;
export type CommodityResponse = Commodity[];

/* /accounts */
export type Balance = {
	acommodity: string;
	acost?: {
		contents: {
			acommodity: string;
			acost: string;
			aquantity: DecimalQuantity;
			astyle: AmountStyle;
		};
		tag: string;
	};
	aquantity: DecimalQuantity;
	astyle: AmountStyle;
};

export type Account = {
	aboring?: boolean;
	adeclarationinfo?: string;
	aebalance: Balance[];
	aibalance: Balance[];
	aname: string;
	anumpostings: number;
	aparent_?: string;
	asubs?: string[];
	asubs_: string[];
};

export type AccountsResponse = Account[];

/* /accounttranseactions/1 */
export type AccountTransactionItem = {
	acommodity: string;
	acost?: string;
	aquantity: DecimalQuantity;
	astyle: AmountStyle;
};

export type AccountTransaction = (AccountTransactionItem | Transaction)[];

export type AccountTransactionsResponse = AccountTransaction[];
