import pickle
from importlib import reload
import serj
import petya
from param import *
from serj import save_to_file, load_from_file

f_res = open('data/total_res_1', "w")
with open('data/total_res_' + MET, "r") as f:
    for i in range (GEN_NUM):
        src_file = 'data/src_' + str(i)
        res1_file = 'data/res1_' + str(i)
        tmp = f.readline()
        if (MET == 'pcst'):
            LIMIT = float(tmp.split(" ")[1])
        opt_res = float(tmp.split(" ")[0])
#        with open(src_file, 'rb') as src_f:
#            src_graph = pickle.load(src_f)
        src_graph = load_from_file(src_file)
        ebs = src_graph.edge_betweenness()
        edges = [(src_graph.es[idx].tuple[0], src_graph.es[idx].tuple[1], src_graph.es["weight"][idx]) for idx in range(src_graph.ecount())]
        result1 = TEST_ALG_1(edges, src_graph.vs["weight"], LIMIT)
        res_tmp = serj.make_new_graph (src_graph, result1, src_graph.vs["weight"])
        res_graph_1 = src_graph.copy()
        res_sums = serj.paint_src(res_graph_1, res_tmp)
        res = res_sums[0] / opt_res
#        with open(res1_file, 'wb') as tmp_f:
#            pickle.dump(res_graph_1, tmp_f)
        save_to_file(res_graph_1,res1_file)
        if (MET == 'brute'):
            f_res.write(str(i) + ' ' + str(res) + '\n')
        elif (MET == 'pcst'):
            f_res.write(str(i) + ' ' + str(res) + ' ' + str(LIMIT) + '\n')
        else:
            print('MET error')
            break
f_res.close()

f_res = open('data/total_res_2', "w")
with open('data/total_res_' + MET, "r") as f:
    for i in range (GEN_NUM):
        src_file = 'data/src_' + str(i)
        res2_file = 'data/res2_' + str(i)
        tmp = f.readline()
        if (MET == 'pcst'):
            LIMIT = float(tmp.split(" ")[1])
        opt_res = float(tmp.split(" ")[0])
#        with open(src_file, 'rb') as src_f:
#            src_graph = pickle.load(src_f)
        src_graph = load_from_file(src_file)
        ebs = src_graph.edge_betweenness()
        edges = [(src_graph.es[idx].tuple[0], src_graph.es[idx].tuple[1], src_graph.es["weight"][idx]) for idx in range(src_graph.ecount())]
        result2 = TEST_ALG_2(edges, src_graph.vs["weight"], LIMIT)
        res_tmp = serj.make_new_graph (src_graph, result2, src_graph.vs["weight"])
        res_graph_2 = src_graph.copy()
        res_sums = serj.paint_src(res_graph_2, res_tmp)
        res = res_sums[0] / opt_res
#        with open(res2_file, 'wb') as tmp_f:
#            pickle.dump(res_graph_2, tmp_f)
        save_to_file(res_graph_2,res2_file)
        if (MET == 'brute'):
            f_res.write(str(i) + ' ' + str(res) + '\n')
        elif (MET == 'pcst'):
            f_res.write(str(i) + ' ' + str(res) + ' ' + str(LIMIT) + '\n')
        else:
            print('MET error')
            break
f_res.close()

f_res = open('data/total_res_3', "w")
with open('data/total_res_' + MET, "r") as f:
    for i in range (GEN_NUM):
        src_file = 'data/src_' + str(i)
        res3_file = 'data/res3_' + str(i)
        tmp = f.readline()
        if (MET == 'pcst'):
            LIMIT = float(tmp.split(" ")[1])
        opt_res = float(tmp.split(" ")[0])
#        with open(src_file, 'rb') as src_f:
#            src_graph = pickle.load(src_f)
        src_graph = load_from_file(src_file)
        ebs = src_graph.edge_betweenness()
        edges = [(src_graph.es[idx].tuple[0], src_graph.es[idx].tuple[1], src_graph.es["weight"][idx]) for idx in range(src_graph.ecount())]
        result3 = TEST_ALG_3(edges, src_graph.vs["weight"], LIMIT, 10, 0.2)
        res_tmp = serj.make_new_graph (src_graph, result3, src_graph.vs["weight"])
        res_graph_3 = src_graph.copy()
        res_sums = serj.paint_src(res_graph_3, res_tmp)
        res = res_sums[0] / opt_res
#        with open(res3_file, 'wb') as tmp_f:
#            pickle.dump(res_graph_3, tmp_f)
        save_to_file(res_graph_3,res3_file)
        if (MET == 'brute'):
            f_res.write(str(i) + ' ' + str(res) + '\n')
        elif (MET == 'pcst'):
            f_res.write(str(i) + ' ' + str(res) + ' ' + str(LIMIT) + '\n')
        else:
            print('MET error')
            break
f_res.close()

f_res = open('data/total_res_4', "w")
with open('data/total_res_' + MET, "r") as f:
    for i in range (GEN_NUM):
        src_file = 'data/src_' + str(i)
        res4_file = 'data/res4_' + str(i)
        tmp = f.readline()
        if (MET == 'pcst'):
            LIMIT = float(tmp.split(" ")[1])
        opt_res = float(tmp.split(" ")[0])
#        with open(src_file, 'rb') as src_f:
#            src_graph = pickle.load(src_f)
        src_graph = load_from_file(src_file)
        ebs = src_graph.edge_betweenness()
        edges = [(src_graph.es[idx].tuple[0], src_graph.es[idx].tuple[1], src_graph.es["weight"][idx]) for idx in range(src_graph.ecount())]
        result4 = TEST_ALG_4(edges, src_graph.vs["weight"], LIMIT, 10, 0.2)
        res_tmp = serj.make_new_graph (src_graph, result4, src_graph.vs["weight"])
        res_graph_4 = src_graph.copy()
        res_sums = serj.paint_src(res_graph_4, res_tmp)
        res = res_sums[0] / opt_res
        with open(res4_file, 'wb') as tmp_f:
            pickle.dump(res_graph_4, tmp_f)
        if (MET == 'brute'):
            f_res.write(str(i) + ' ' + str(res) + '\n')
        elif (MET == 'pcst'):
            f_res.write(str(i) + ' ' + str(res) + ' ' + str(LIMIT) + '\n')
        else:
            print('MET error')
            break
f_res.close()