import { ImageItem, Series } from 'src/types/types'

export const series: Series[] = [
  {
    id: 1,
    name: 'Charcoal'
  },
  {
    id: 2,
    name: 'Ink'
  },
  {
    id: 3,
    name: 'Kitties'
  }
]

export const images: ImageItem[] = [
  {
    id: 1,
    title: 'Help-ta-gone',
    medium: 'Charcoal/rives BFK',
    dimensions: '42" x 44"',
    year: '1993',
    path: 'Help-ta-gone.jpeg',
    isFeatured: true,
    seriesId: 1
  },
  {
    id: 2,
    title: 'Background Presence',
    medium: 'Charcoal/rives BFK',
    dimensions: '43" x 46"',
    year: '1990',
    path: 'Background-Presence.jpeg',
    isFeatured: true,
    seriesId: 1 
  },
  {
    id: 3,
    title: 'Forms of Protest',
    medium: 'Charcoal/rives BFK',
    dimensions: '46" x 39"',
    year: '1991',
    path: 'Protest-I.jpeg',
    isFeatured: true,
    seriesId: 1 
  },
  {
    id: 4,
    title: 'Bright Blue Doublet',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '27" x 19"',
    year: '',
    path: 'Bright-Blue-Doublet.jpeg',
    isFeatured: true,
    seriesId: 2 
  },
  {
    id: 5,
    title: 'Green Reaching',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '',
    path: 'Green-reaches.jpeg',
    isFeatured: true,
    seriesId: 2 
  },
  {
    id: 6,
    title: 'kitties-1',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '2020',
    path: 'http://placekitten.com/260/300',
    isFeatured: false,
    seriesId: 3
  },
  {
    id: 7,
    title: 'kitties-2',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '42" x 44"',
    year: '2021',
    path: 'http://placekitten.com/420/440',
    isFeatured: false,
    seriesId: 3
  },
  {
    id: 8,
    title: 'Join Me!',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '',
    path: 'Join-me.jpeg',
    isFeatured: true,
    seriesId: 2
  },
  {
    id: 9,
    title: 'kitties-3',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '2022',
    path: 'http://placekitten.com/360/290',
    isFeatured: false,
    seriesId: 3
  },
  {
    id: 10,
    title: 'kitties-4',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '2021',
    path: 'http://placekitten.com/360/350',
    isFeatured: false,
    seriesId: 3
  },
  {
    id: 11,
    title: 'kitties-5',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '2022',
    path: 'http://placekitten.com/270/300',
    isFeatured: false,
    seriesId: 3
  },
  {
    id: 12,
    title: 'kitties-6',
    medium: 'Watercolor ink/Watercolor paper',
    dimensions: '26" x 19"',
    year: '2020',
    path: 'http://placekitten.com/250/275',
    isFeatured: false,
    seriesId: 3
  }

]
