import {AggregationSchema} from 'Builders/Aggregation/types';
import {Bool} from 'Builders/Bool';

interface IFacet {
  active: object;
  inactive: InactiveFacet;
}

type FacetType = keyof IFacet;

type InactiveFacet = Record<'filter' | 'aggs', object>;

export class EshopFacets {
  private _facets: IFacet = {
    active: {},
    inactive: {
      aggs: {},
      filter: {},
    },
  };

  public setupInactiveFacets(filter: Bool): void {
    this._facets.inactive!.filter = filter;
  }

  public addInactiveFacet<Type extends keyof AggregationSchema>(
      facetType: FacetType,
      aggType: Type,
      name: string,
      d: AggregationSchema[Type],
  ) {
    const {filter, subAgg, ...all} = d.params as { filter?: any; subAgg?: any };
    let sub = {};
    if (subAgg) {
      sub = {
        aggs: {
          ...subAgg,
        },
      };
    }
    if (filter) {
      this._facets[facetType][name] = {
        filter,
        aggs: {
          [`${name}_filtered`]: {
            [aggType]: {...all, ...((d.opts as object) || {})},
            ...sub,
          },
        },
      };
      return this;
    }

    this._facets[facetType][name] = {
      [aggType]: {...all, ...((d.opts as object) || {})},
      ...sub,
    };
    return this;
  }

  public addCustom(facetType: FacetType, name: string, cutsomAgg: object) {
    this._facets[facetType][name] = cutsomAgg;
  }

  public build(): object {
    if (Object.keys(this._facets.inactive.aggs).length > 0 && Object.keys(this._facets.inactive.filter).length < 1) {
      throw new Error('Please setup inactive facets');
    }
    return this._facets;
  }

  public isNotEmty(): boolean {
    return Object.keys({...this._facets.active, ...this._facets.inactive.aggs}).length > 0;
  }
}
