// import { Point } from "@/types/points";

// export function getRegionForCoordinates(points : Point) {
//     // points should be an array of { latitude: X, longitude: Y }
//     let minX: number, maxX: number, minY: number, maxY: number;
  
//     // init first point
//     ((point: Point) => {
//       minX = point.latitude;
//       maxX = point.latitude;
//       minY = point.longitude;
//       maxY = point.longitude;
//     })(points[0] as Point);
  
//     // calculate rect
//     points.map((point) => {
//       minX = Math.min(minX, point.latitude);
//       maxX = Math.max(maxX, point.latitude);
//       minY = Math.min(minY, point.longitude);
//       maxY = Math.max(maxY, point.longitude);
//     });
  
//     const midX = (minX + maxX) / 2;
//     const midY = (minY + maxY) / 2;
//     const deltaX = (maxX - minX);
//     const deltaY = (maxY - minY);
  
//     return {
//       latitude: midX,
//       longitude: midY,
//       latitudeDelta: deltaX,
//       longitudeDelta: deltaY
//     };
//   }