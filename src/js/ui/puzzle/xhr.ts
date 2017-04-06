import { fetchJSON } from '../../http'

export function attempt(id: string, win: boolean) {
  return fetchJSON(`/training/${id}/round2`, {
    method: 'POST',
    body: JSON.stringify({
      win: win ? 1 : 0
    })
  })
}

export function loadPuzzle(id: string) {
  return fetchJSON(`/training/${id}/load`)
}

export function newPuzzle() {
  return fetchJSON('/training/new')
}
