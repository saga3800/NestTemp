/**
 * Clase con estructura para manejo de paginación
 */
export class Pagination {

    readonly previousPageIndex?: number;
    readonly nextPageIndex?: number;
    readonly totalPages?: number;

    constructor(readonly totalDocuments: number, readonly pageIndex: number, readonly pageSize: number) {
        const tp = Math.trunc(totalDocuments / pageSize);
        this.totalPages = ((totalDocuments % pageSize) > 0) ? (tp + 1) : tp;
        this.previousPageIndex = (pageIndex > 1) ? (pageIndex - 1) : null;
        this.nextPageIndex = (pageIndex < this.totalPages) ? pageIndex + 1 : null;
    }
}

export class ResponsePaginator<T> {

    public readonly pagination: Pagination;

    constructor(public readonly data: T[], page: number, limit: number) {
        this.pagination = new Pagination(data?.length || 0, page, limit);
    }
}


