from random import randint, gauss
import networkx as nx
import igraph as ig
import pcst_fast as pcst
import pickle
from importlib import reload
import serj
import petya
from serj import save_to_file, load_from_file

from param import *

# Генерируем и рисуем начальные графы
for num in range(GEN_NUM):
    flag = False
    while (flag == False):
        src_graph = ig.Graph.GRG(NUM_VERTICES, MAGIC)
        #src_graph = Graph.Full(10)
        #summary(src_graph)
#        src_graph.es["weight"] = list(range(src_graph.ecount()))
#        src_graph.vs["weight"] = list(range(src_graph.vcount()))
#        src_graph.es["paint"] = list(range(src_graph.ecount()))
#        src_graph.vs["paint"] = list(range(src_graph.vcount()))
#        src_graph.es["weight"] = [randint(RANDOM_E_MIN,RANDOM_E_MAX) for i in range(src_graph.ecount())]
#        src_graph.vs["weight"] = [randint(RANDOM_V_MIN,RANDOM_V_MAX) for i in range(src_graph.vcount())]
#как-то генерим графы
        src_graph.es["weight"] = [max(0.1, int(gauss(MU_E,SIGMA_E))) for i in range(src_graph.ecount())]
        src_graph.vs["weight"] = [max(0.1, int(gauss(MU_V,SIGMA_V))) for i in range(src_graph.vcount())]
        src_graph.es["color"] = ["black" for i in range(src_graph.ecount())]
        src_graph.vs["color"] = ["red" for i in range(src_graph.vcount())]
        src_graph.es["id"] = [idx for idx in range(src_graph.ecount())]
        src_graph.vs["id"] = [idx for idx in range(src_graph.vcount())]
        src_graph.es["label"] = [str(idx) for idx in range(src_graph.ecount())]
        src_graph.vs["label"] = [str(idx) for idx in range(src_graph.vcount())]
        src_graph.es["v1"] = [src_graph.es[idx].tuple[0] for idx in range(src_graph.ecount())]
        src_graph.es["v2"] = [src_graph.es[idx].tuple[1] for idx in range(src_graph.ecount())]
#проверка на связность
        G = nx.Graph()
        g_v = [idx for idx in range(src_graph.vcount())]
        edges_very_short = [(src_graph.es[idx].tuple) for idx in range(src_graph.ecount())]
        G.add_nodes_from(g_v)
        G.add_edges_from(edges_very_short)
        flag = nx.is_connected(G)
#сохраняем файл для роботов
    src_file = 'data/src_' + str(num)
    with open(src_file, 'wb') as tmp_f:
        pickle.dump(src_graph, tmp_f)
    src_file_simple = 'data/simple_src_' + str(num)
#    formats = ["adjacency","dot","edgelist","gml","graphml","net","svg"]
    save_to_file(src_graph, src_file)
   

        
# Прогоняем полный перебор или pcst
f_res = open('data/total_res_' + MET, "w")
#f_res.write('id (prize, price, vertices, links)' + '\n')
for num in range (GEN_NUM):
    src_file = 'data/src_' + str(num)
    brute_file = 'data/' + MET + '_' + str(num)
#    with open(src_file, 'rb') as f_src:
#        src_graph = pickle.load(f_src)
    src_graph = load_from_file(src_file)
    if (MET == 'brute'):
#       ebs = src_graph.edge_betweenness()
        edges = [(src_graph.es[idx].tuple[0], src_graph.es[idx].tuple[1], src_graph.es["weight"][idx]) for idx in range(src_graph.ecount())]
        res_brute = petya.optgraph_brute(edges, src_graph.vs["weight"], LIMIT)
    elif (MET == 'pcst'): 
        edges_very_short = [(src_graph.es[idx].tuple) for idx in range(src_graph.ecount())]
        result_nodes, result_edges = pcst.pcst_fast(edges_very_short, src_graph.vs["weight"], src_graph.es["weight"], 0, 1, 'strong', 0)
        res_brute = [src_graph.es[i].tuple for i in result_edges]
    else:
        print("MET error")
        break
    res_tmp = serj.make_new_graph (src_graph, res_brute, src_graph.vs["weight"])
    brute_graph = src_graph.copy()
    res_sums = serj.paint_src(brute_graph, res_tmp)
#    with open(brute_file, 'wb') as tmp_f:
#        pickle.dump(brute_graph, tmp_f)
    save_to_file(brute_graph,brute_file)
    f_res.write(str(res_sums[0]) + ' ' + str(res_sums[1]) + ' ' + str(res_sums[2]) + ' ' + str(res_sums[3]) + '\n')
#    f_res.write(str(num) + ' ' + str(res_sums) + '\n')
f_res.close()
