/**
 * Search
 */

import * as React from 'react'
import { DataList } from './datalist'
import { SearchIcon } from '../icons'
import { Record } from '../record'

interface Props {
  data: Record[]
  search: string
  autoComplete: boolean
  onChange(search: string): void
  onQuery(search: string): void
}

let uid = 0

// The minimum number of characters before searching
const THRESHOLD = 2

// The minimum time between change events
const INTERVAL = 150

export default class Search extends React.Component<Props> {
  id: number = uid++
  timer: number = null

  componentWillUnmount() {
    window.clearTimeout(this.timer)
  }

  render() {
    let { search, autoComplete, data } = this.props
    let inputId = `ars_search_${this.id}`
    let listId = `ars_search_list_${this.id}`

    let autoCompleteOpts = {}
    if (!autoComplete) {
      autoCompleteOpts['autoComplete'] = 'off'
    }

    return (
      <form className="ars-search" onSubmit={this.onSubmit.bind(this)}>
        <label className="ars-search-label" htmlFor={inputId}>
          <SearchIcon />
        </label>
        <input
          {...autoCompleteOpts}
          id={inputId}
          list={autoComplete ? listId : null}
          type="search"
          className="ars-search-input"
          placeholder="Search"
          value={search}
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        />
        {autoComplete && <DataList id={listId} items={data} />}
        <button className="ars-hidden">Submit</button>
      </form>
    )
  }

  private update() {
    clearTimeout(this.timer)

    this.timer = window.setTimeout(() => {
      const { search } = this.props
      this.props.onQuery(search.length >= THRESHOLD ? search : '')
    }, INTERVAL)
  }

  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event.target.value)
    this.update()
  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault()
    this.update()
  }

  private onKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      this.setState({ search: '' }, this.update.bind(this))
    }
  }
}
