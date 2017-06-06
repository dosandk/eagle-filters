const filtersList = [
    {
        name: 'riba',
        value: 'riba-1',
        id: '1',
        parent: ''
    },
    {
        name: 'riba-1.1',
        value: 'riba-1.1',
        id: '1.1',
        parent: '1'
    },
    {
        name: 'riba-1.2',
        value: 'riba-1.2',
        id: '1.2',
        parent: '1'
    },
    {
        name: 'foo-1',
        value: 'foo-1',
        id: '2',
        parent: ''
    },
    {
        name: 'foo-1.1',
        value: 'foo-1.1',
        id: '2.1',
        parent: '2'
    },
    {
        name: 'foo-1.2',
        value: 'foo-1.1',
        id: '2.2',
        parent: '2'
    },
    {
        name: 'foo-1.1.1',
        value: 'foo-1.1',
        id: '2.1.1',
        parent: '2.1'
    },
    {
        name: 'foo-1.1.2',
        value: 'foo-1.1',
        id: '2.1.2',
        parent: '2.1'
    }
];

const store = {
    funds: {
        sectorExposure: {
            fundName: {
                data: {},
                activeFilters: filtersList
            }
        }
    }
};

const filtersListEl = document.getElementById('filters-list');
const controlsContainer = document.getElementById('controls');

controlsContainer.addEventListener('click', e => {
   const {target} = e;

   if (target.localName === 'button') {
       const id = target.innerText;
       const filterEl = document.getElementById(id);

       if (filterEl) {
           filterEl.classList.toggle('hide');
       } else {
           createFilterEl({id});
       }
   }
});

filtersListEl.addEventListener('click', e => {
    const id = e.target.innerText;

    function getFilters (ids, filtersList) {
        const result = filtersList.filter(item => item.id === id);

        (function getIdList(ids, arr) {
            const childs = ids.reduce((accum, id)=> {
                return accum.concat.apply(accum, arr.filter(item => item.parent === id));
            }, []);

            const childsIds = childs.map(item => item.id);

            Array.prototype.push.apply(result, childs);

            return childs.length ? getIdList(childsIds, arr) : childsIds;
        }(ids, filtersList));

        return result;
    }

    const activeFilter = getFilters([id], filtersList);

    activeFilter.forEach(filter => {
        const filterEl = document.getElementById(filter.id);

        filterEl.classList.add('hide');
    })
});

function generateFilters(filtersList) {
    filtersList.forEach(createFilterEl);
}

function createFilterEl({id}) {
    const liEl = document.createElement('li');

    liEl.innerText = `${id}`;
    liEl.classList.add('filter');
    liEl.id = `${id}`;

    filtersListEl.appendChild(liEl);
}

function generateControls(filtersList) {

    filtersList.forEach(filter => {
        const liEl = document.createElement('button');

        liEl.innerText = `${filter.id}`;
        controlsContainer.appendChild(liEl);
    });
}

generateControls(filtersList);

console.log('filtersListEl', filtersListEl);
console.log('store', store);
