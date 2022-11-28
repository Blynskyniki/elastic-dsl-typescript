import { AggregationSchema } from '../Aggregation/types';
import { Bool } from '../Bool';
import { AbstractBulder } from '../../Abstract/AbstractBuilder';

interface IFacet {
  [key: string]: any;

  inactive: InactiveFacet;
}

type FacetType = keyof IFacet;

type InactiveFacet = Record<'filter' | 'aggs', any>;

export class EshopFacets extends AbstractBulder {
  private _facets: IFacet = {
    inactive: {
      aggs: {},
      filter: {},
    },
  };

  public setupInactiveFacets(filter: Bool): void {
    this._facets.inactive!.filter = filter.build();
  }

  public add<Type extends keyof AggregationSchema>(
      facetType: FacetType,
      aggType: Type,
      name: string,
      d: AggregationSchema[Type],
  ) {
    const { filter, subAgg, ...all } = d.params as { filter?: object; subAgg?: object };
    let sub = {};
    let data = {};
    if (subAgg) {
      sub = {
        aggs: {
          ...subAgg,
        },
      };
    }
    if (filter) {
      data = {
        filter,
        aggs: {
          [`${name}_filtered`]: {
            [aggType]: { ...all, ...((d.opts as object) || {}) },
            ...sub,
          },
        },
      };
    } else {
      data = {
        [aggType]: { ...all, ...((d.opts as object) || {}) },
        ...sub,
      };
    }

    facetType === 'inactive' ? (this._facets['inactive']['aggs'][name] = data) : (this._facets[name] = data);
    return this;
  }

  public addCustom(facetType: FacetType, name: string, cutsomAgg: object) {
    facetType === 'inactive' ? (this._facets['inactive']['aggs'][name] = cutsomAgg) : (this._facets[name] = cutsomAgg);
  }

  public build(): object {
    if (Object.keys(this._facets.inactive.aggs).length > 0 && Object.keys(this._facets.inactive.filter).length < 1) {
      throw new Error('Please setup inactive facets');
    }
    return this._facets;
  }

  public isNotEmty(): boolean {
    return Object.keys({ ...this._facets, ...this._facets.inactive.aggs }).length > 1;
  }
}
