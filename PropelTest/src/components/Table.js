import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

class Table extends Component {
	constructor() {
        super()
		this.people = [
			{
				name: "John Sina",
				birth: "11/30/2011"
			}, {
				name: "Barcy Washington",
				birth: "09/16/1992"
			}, {
				name: "Peter Parker",
				birth: "01/16/1992"
			}, {
				name: "Jimmy Shergil",
				birth: "12/12/2001"
			}, {
				name: "Alexander Alfred",
				birth: "02/09/1891"
			}, {
				name: "Krishna Gupta",
				birth: "12/01/1982"
			}, {
				name: "Sania Mirza",
				birth: "11/30/2011"
			}, {
				name: "Lata Pathak",
				birth: "10/31/1999"
			}
		];
	
	}

	
	compareDates(person1, person2) {
		//console.log('Inside dates')
		return new Date(person1.birth)-new Date(person2.birth)
		
		
	}

	compareNames(person1, person2) {
		//console.log('Inside names')
		return person1.name.localeCompare(person2.name)
		
	}

	render() {
		//console.log(this.props.sortByParam)
		if (this.props.sortByParam) {
			if (this.props.sortByParam === 'name') {
				this.people.sort(this.compareNames)
			}
			else if (this.props.sortByParam === 'age') {
				this.people.sort(this.compareDates)
			}
			
		}
		//console.log(this.people)
		return (
  <div className='table-div'>
    <table className='table table-striped table-bordered table-hover full-width'>
      <thead>
        <tr>
          <th className='course-name'>Person Name</th>
          <th className='duration'>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
						{this.people.map(x => (
							<tr key={x.name}>
								<td>{x.name}</td>
								<td>{x.birth}</td>
								</tr>
						)
							
							
		)}
      </tbody>
    </table>
  </div>
);

	}
}

// Uncomment the snippet below
Table.propTypes = {
	sortParameter: PropTypes.string
}

export default Table;
